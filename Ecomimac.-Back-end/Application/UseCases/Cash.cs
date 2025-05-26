namespace ReferenceService;

public class CashService(
    DatabaseContext databaseContext,
    IConnectionHub connectionHubService
) : ICash
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;

    public Cash Create(
        Guid profileId,
        Guid fundId,
        CashDataTransformer.Create create
    )
    {
        if (
            _databaseContext.Fund.Any(fund =>
                fund.Id == fundId && fund.ProfileId == profileId
            )
            is false
        )
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUNT_FUNDS
            );

        Cash cash = new(create.Name, create.Quantity) { FundId = fundId };
        _databaseContext.Add(cash);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            nameof(HubMethodName.CASH),
            nameof(Object)
        );
        return cash;
    }

    public string Remove(Guid profileId, Guid cashId)
    {
        Cash cash =
            _databaseContext.Cash.FirstOrDefault(cash =>
                cash.Id == cashId && cash.Fund.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CASH
            );

        _databaseContext.Remove(cash);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            nameof(HubMethodName.CASH),
            nameof(Object)
        );
        return string.Empty;
    }
}
