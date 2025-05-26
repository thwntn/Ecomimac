namespace ReferenceService;

public class InvoiceService(
    DatabaseContext databaseContext,
    IProduct productService,
    IDiscount discountService,
    IConnectionHub connectionHubService,
    ICache cacheService,
    IActivity activityService,
    IStatusInvoice statusInvoice
) : IInvoice
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IProduct _productService = productService;
    private readonly IDiscount _discountService = discountService;
    private readonly IConnectionHub _connectionHubService = connectionHubService;
    private readonly ICache _cacheService = cacheService;
    private readonly IActivity _activityService = activityService;
    private readonly IStatusInvoice _statusInvoice = statusInvoice;

    public Pagination<Invoice> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Invoice> invoices = _databaseContext
            .Invoice.Include(invoice => invoice.InvoiceDiscounts)
            .ThenInclude(invoiceDiscount => invoiceDiscount.Discount)
            .Include(invoice => invoice.InvoiceProducts)
            .Include(invoice => invoice.Customer)
            .Include(invoice => invoice.Profile)
            .OrderByDescending(invoice => invoice.Created)
            .Where(invoice =>
                invoice.ProfileId == profileId && invoice.Deleted == null
            );

        return new(invoices, queryOptions);
    }

    public Invoice Info(Guid profileId, Guid invoiceId)
    {
        Invoice invoice =
            _databaseContext
                .Invoice.Include(invoice => invoice.InvoiceDiscounts)
                .ThenInclude(invoiceDiscount => invoiceDiscount.Discount)
                .Include(invoice => invoice.InvoiceProducts)
                .ThenInclude(invoiceProduct => invoiceProduct.Product)
                .ThenInclude(product => product.ImageProducts)
                .Include(invoice => invoice.Customer)
                .Include(invoice => invoice.Profile)
                .Where(invoice =>
                    invoice.ProfileId == profileId && invoice.Id == invoiceId
                )
                .FirstOrDefault()
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_INVOICE
            );
        ;
        return invoice;
    }

    public IEnumerable<Invoice> Recent(Guid profileId)
    {
        IEnumerable<Invoice> invoice = _databaseContext
            .Invoice.Where(invoice => invoice.ProfileId == profileId)
            .OrderByDescending(invoice => invoice.Created)
            .Take(5);
        return invoice;
    }

    public Invoice Create(Guid profileId, InvoiceDataTransformer.Create create)
    {
        Invoice invoice = Mapper.Map<Invoice>(create);
        invoice.Id = Guid.Empty;
        invoice.ProfileId = profileId;

        if (create.CustomerId == Guid.Empty)
            invoice.CustomerId = Guid.Empty;

        /// Get status invoice | If not in body get default value
        InvoiceStatus status = GetStatusInvoice(create);
        invoice.Status = status;
        invoice.PaymentMethod = create.Payment.Key;

        long discountPrice = 0;
        long basePrice = invoice
            .InvoiceProducts.Select(invoiceProducts =>
                invoiceProducts.Price * invoiceProducts.Quantity
            )
            .Cast<long>()
            .Aggregate((current, next) => current + next);
        invoice.InvoiceDiscounts = CreateInvoiceDiscount(
            profileId,
            create.DiscountId
        );
        if (invoice.InvoiceDiscounts.Count is not 0)
            discountPrice = invoice
                .InvoiceDiscounts.Select(invoiceDiscount =>
                    invoiceDiscount.Discount.DiscountCode switch
                    {
                        DiscountCode.AMOUNT => invoiceDiscount.Discount.Amount,
                        DiscountCode.PERCENT => long.Parse(
                            Math.Ceiling(invoiceDiscount.Percent * basePrice)
                                .ToString()
                        ),
                        _ => 0,
                    }
                )
                .Aggregate((current, next) => current + next);

        invoice.BasePrice = basePrice;
        invoice.DiscountPrice = discountPrice;
        invoice.LatestPrice = Format.LimitZero(basePrice - discountPrice);

        invoice.InvoiceProducts = Mapper.Map<List<InvoiceProduct>>(
            CreateInvoiceProduct(
                profileId,
                invoice.Id,
                create.InvoiceProducts,
                discountPrice
            )
        );

        _databaseContext.Add(invoice);
        _databaseContext.SaveChanges();

        ResetCache(profileId);

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.INVOICE_CREATE),
                    Mapper.Serialize(invoice)
                ),
            ]
        );

        /// Close QR code on display
        CloseTransaction(profileId);
        return invoice;
    }

    private static InvoiceStatus GetStatusInvoice(
        InvoiceDataTransformer.Create create
    )
    {
        /// Wait transaction banking
        if (create.Payment.Key == PaymentMethod.Credit)
            return InvoiceStatus.WAITING;

        if (create.Status == default)
            return InvoiceStatus.DONE;

        return create.Status.Key;
    }

    private List<InvoiceDiscount> CreateInvoiceDiscount(
        Guid profileId,
        Guid discountId
    )
    {
        if (discountId == Guid.Empty)
            return [];

        Discount discount =
            _discountService
                .List(profileId, new())
                .Data.FirstOrDefault(discount => discount.Id == discountId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DISCOUNT
            );

        /// Update quantity discount
        if (
            discount.DiscountQuantityType is DiscountQuantityType.WITH_QUANTITY
            && discount.Used >= discount.Quantity
        )
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.LIMIT_DISCOUNT_VALUE
            );

        /// Verify time life discount
        DateTime dateTime = Timebase.Now();
        if (
            discount.DiscountTimeFrameType == DiscountTimeFrameType.TIME_FRAME
            && discount.FromDate > dateTime
            && discount.ToDate < dateTime
        )
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.DISCOUNT_EXPIRED
            );

        discount.Used += 1;
        discount.Updated = dateTime;
        _databaseContext.Update(discount);
        _databaseContext.SaveChanges();

        return
        [
            new InvoiceDiscount
            {
                DiscountId = discount.Id,
                Discount = discount,
                Amount = discount.Amount,
                Percent = discount.Percent,
            },
        ];
    }

    private IEnumerable<InvoiceProduct> CreateInvoiceProduct(
        Guid profileId,
        Guid invoiceId,
        List<InvoiceDataTransformer.ProductCreate> productCreates,
        long discountPrice
    )
    {
        IEnumerable<Product> products = _databaseContext
            .Product.Where(product => product.ProfileId == profileId)
            .AsEnumerable()
            .Where(product =>
                productCreates.Any(item => item.Id == product.Id)
            );

        IEnumerable<InvoiceProduct> invoiceProducts = productCreates.Select(
            invoiceProduct =>
            {
                Product product = products.FirstOrDefault(item =>
                    item.Id == invoiceProduct.Id
                );
                return new InvoiceProduct(
                    invoiceId,
                    invoiceProduct.Id,
                    product.Price - (discountPrice / products.Count()),
                    invoiceProduct.Quantity
                );
            }
        );

        return invoiceProducts;
    }

    public string Remove(Guid profileId, Guid invoiceId)
    {
        Invoice invoice =
            _databaseContext
                .Invoice.Where(invoice =>
                    invoice.Id == invoiceId && invoice.ProfileId == profileId
                )
                .FirstOrDefault()
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_INVOICE
            );

        invoice.DeleteBy = profileId;
        _databaseContext.Update(invoice);
        _databaseContext.SaveChanges();

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.INVOICE_DELETE),
                    Mapper.Serialize(invoice)
                ),
            ]
        );
        ResetCache(profileId);
        return string.Empty;
    }

    public InvoiceProduct AddProduct(
        Guid profileId,
        InvoiceDataTransformer.AddProduct addProduct
    )
    {
        Product product =
            _databaseContext.Product.FirstOrDefault(product =>
                product.Id == addProduct.ProductId
                && product.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_INVOICE
            );

        InvoiceProduct invoiceProduct =
            new(
                addProduct.InvoiceId,
                addProduct.ProductId,
                product.Price,
                addProduct.Quantity
            );

        _databaseContext.InvoiceProduct.Add(invoiceProduct);
        return invoiceProduct;
    }

    public IEnumerable<Activity> Log(string invoiceCode)
    {
        IEnumerable<Activity> activities = _databaseContext.Activity.Where(
            activity => activity.JsonData == invoiceCode
        );
        return activities;
    }

    public void ScannerProduct(
        Guid profileId,
        InvoiceDataTransformer.Scanner scanner
    )
    {
        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.SCANNER_PRODUCT),
            new InvoiceObject.Scanner(
                profileId,
                scanner.ProductId,
                scanner.Code
            )
        );
    }

    public IEnumerable<StatusInvoiceObject.Status> Counter(Guid profileId)
    {
        IEnumerable<StatusInvoiceObject.Status> statusInvoices =
            _statusInvoice.List();

        IEnumerable<InvoiceObject.Counter> counters = _databaseContext
            .Invoice.Where(invoice => invoice.ProfileId == profileId)
            .GroupBy(invoice => invoice.Status)
            .Select(group => new InvoiceObject.Counter(
                group.Key,
                group.Count(),
                group.Sum(item => item.LatestPrice)
            ));

        foreach (var statusInvoice in statusInvoices)
        {
            InvoiceObject.Counter counter = counters.FirstOrDefault(counter =>
                counter.Key == statusInvoice.Key
            );

            if (counter is null)
                continue;

            statusInvoice.Quantity = counter.Quantity;
            statusInvoice.TotalCost = counter.TotalCost;
        }

        return statusInvoices;
    }

    public Invoice Status(
        Guid profileId,
        Guid invoiceId,
        InvoiceStatus invoiceStatus
    )
    {
        Invoice invoice =
            _databaseContext.Invoice.FirstOrDefault(invoice =>
                invoice.Id == invoiceId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_INVOICE
            );

        invoice.Status = invoiceStatus;
        _databaseContext.Update(invoice);
        _databaseContext.SaveChanges();

        ResetCache(profileId);

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.INVOICE_UPDATE),
                    Mapper.Serialize(invoice)
                ),
            ]
        );
        return invoice;
    }

    public InvoiceObject.BankingAccount BankAccount(Guid profileId)
    {
        List<string> settingNames =
        [
            nameof(SettingNames.BANK_ID),
            nameof(SettingNames.BANK_ACCOUNT_NAME),
            nameof(SettingNames.BANK_ACCOUNT_NO),
        ];

        IEnumerable<Setting> settings = _databaseContext.Setting.Where(
            setting =>
                settingNames.Contains(setting.Name)
                && setting.ProfileId == profileId
        );

        if (settings.Count() < settingNames.Count)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SETTING
            );

        string bankId = FindConfig(settings, nameof(SettingNames.BANK_ID));
        string accountNo = FindConfig(
            settings,
            nameof(SettingNames.BANK_ACCOUNT_NO)
        );
        string accountName = FindConfig(
            settings,
            nameof(SettingNames.BANK_ACCOUNT_NAME)
        );

        InvoiceObject.BankingAccount bankingAccount =
            new(accountNo, accountName, bankId);

        return bankingAccount;
    }

    private static string FindConfig(IEnumerable<Setting> settings, string name)
    {
        Setting setting = settings.First(setting => setting.Name == name);
        return setting.Value;
    }

    public void ResetCache(Guid profileId)
    {
        string nameofCache = nameof(Invoice) + profileId;
        _cacheService.Reset(nameofCache);
    }

    public void OpenTransaction(
        Guid profileId,
        InvoiceDataTransformer.OpenTransaction openTransaction
    )
    {
        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.INVOICE_OPEN_TRANSACTION),
            openTransaction
        );
    }

    public void CloseTransaction(Guid profileId)
    {
        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.INVOICE_CLOSE_TRANSACTION),
            default
        );
    }

    public void FinishTransaction(string code)
    {
        _connectionHubService.Invoke(
            nameof(HubMethodName.INVOICE_FINISH_TRANSACTION),
            code
        );
    }

    public IEnumerable<Discount> Discount(Guid profileId)
    {
        DateTime dateTime = Timebase.Now();
        IEnumerable<Discount> discounts = _databaseContext.Discount.Where(
            discount =>
                discount.ProfileId == profileId
                && discount.Status == DiscountStatus.Active
        );

        IEnumerable<Discount> active = discounts.Where(discount =>
            discount.DiscountTimeFrameType == DiscountTimeFrameType.NORMAL
            || (
                discount.DiscountTimeFrameType
                    == DiscountTimeFrameType.TIME_FRAME
                && discount.FromDate <= dateTime
                && discount.ToDate >= dateTime
            )
        );

        return active;
    }
}
