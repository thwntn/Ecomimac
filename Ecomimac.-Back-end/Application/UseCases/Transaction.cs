namespace ReferenceService;

public class TransactionService(
    ISetting settingService,
    DatabaseContext databaseContext,
    IInvoice invoiceService,
    ITelegram telegramService
) : ITransaction
{
    private readonly ISetting _settingService = settingService;
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IInvoice _invoiceService = invoiceService;
    private readonly ITelegram _telegramService = telegramService;

    public string Payment(string name)
    {
        Setting setting =
            _databaseContext.Setting.FirstOrDefault(setting =>
                setting.Name == name
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SETTING
            );

        TransactionObject.Package package =
            Mapper.Deserialize<TransactionObject.Package>(
                setting.Value
            );

        Random random = new();
        string configure = Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.Vnpay)
        );

        configure = configure.Replace("__AMOUNT__", package.Pricing + "00");
        configure = configure.Replace(
            "__CREATED_DATE__",
            Timebase.Now().ToString("yyyyMMddHHmmss")
        );
        configure = configure.Replace("__ORDER_INFO__", "UpgradePackage");
        configure = configure.Replace(
            "__TXN_REFERENCE__",
            random.Next(0, 10000).ToString()
        );

        Uri uri = new(configure);
        string query = uri.Query[1..];

        string hash = Cryptography.HmacSha256(
            query,
            Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.VnPayHashSecret)
            )
        );

        return uri + "&vnp_SecureHash=" + hash;
    }

    public Dictionary<string, TransactionObject.Package> Package()
    {
        Dictionary<string, TransactionObject.Package> packages = _settingService
            .Get(
                [
                    nameof(SettingNames.PACKAGE_FREE),
                    nameof(SettingNames.PACKAGE_PERSONAL),
                    nameof(SettingNames.PACKAGE_BUSINESS),
                ]
            )
            .ToDictionary(
                key => key.Key,
                value =>
                    Mapper.Deserialize<TransactionObject.Package>(
                        value.Value
                    )
            );

        return packages;
    }

    public Setting Config(string name, TransactionObject.Package package)
    {
        Setting setting = _settingService.UpSert(
            new() { Name = name, Value = Mapper.Serialize(package) }
        );

        return setting;
    }

    public async Task<TransactionObject.MessageResponse> Verify(
        TransactionDataTransformer.SepayRequest sepayRequest
    )
    {
        string description = MessageConstant.TRANSACTION_SUCCESS;
        StatusTransaction statusTransaction = StatusTransaction.ERROR;

        Transaction record = _databaseContext.Transaction.FirstOrDefault(
            transaction => transaction.TransactionId == sepayRequest.Id
        );

        Invoice invoice = _databaseContext.Invoice.FirstOrDefault(invoice =>
            invoice.Code == sepayRequest.Content
        );
        if (record is null && invoice is not null)
        {
            if (
                sepayRequest.Content.Contains(invoice.Code)
                && sepayRequest.TransferAmount == invoice.LatestPrice
            )
            {
                invoice.Status = InvoiceStatus.DONE;
                statusTransaction = StatusTransaction.ACCEPT;
            }

            _databaseContext.Update(invoice);
            _invoiceService.ResetCache(invoice.ProfileId);

            _invoiceService.CloseTransaction(invoice.ProfileId);

            await _telegramService.SendMessage(
                invoice.Code + invoice.LatestPrice.ToString()
            );
        }
        else
            description = MessageConstant.TRANSACTION_DUPLICATE_REQUEST;

        Transaction transaction = new(
            sepayRequest.Id,
            sepayRequest.TransferAmount,
            sepayRequest.TransactionDate,
            Mapper.Serialize(sepayRequest),
            statusTransaction
        )
        {
            Description = description,
        };

        _databaseContext.Transaction.Add(transaction);
        _databaseContext.SaveChanges();
        return new();
    }
}
