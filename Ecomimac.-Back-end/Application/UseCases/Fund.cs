namespace ReferenceService;

public class FundService(
    DatabaseContext databaseContext,
    IJwt jwtService,
    IConnectionHub connectionHubService
) : IFund
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;

    public IEnumerable<Fund> List()
    {
        IEnumerable<Fund> fund = _databaseContext
            .Fund.Include(fund => fund.Cashes)
            .ThenInclude(cash => cash.CashDescriptions)
            .Where(fund =>
                fund.ProfileId == _jwtService.Information().ProfileId
            )
            .OrderByDescending(fund => fund.Created);
        return fund.Select(fund =>
        {
            MapData(fund);
            return fund;
        });
    }

    private static Fund MapData(Fund fund)
    {
        long abstractCost = 0,
            subtractCost = 0;

        fund.Cashes.ToList()
            .ForEach(cash =>
            {
                cash.TotalAbstract = cash
                    .CashDescriptions.Select(cashDescription =>
                        cashDescription.CashNames == CashNames.Abstract
                            ? long.Parse(cashDescription.Quantity)
                            : 0
                    )
                    .Sum();
                cash.TotalSubtract = cash
                    .CashDescriptions.Select(cashDescription =>
                        cashDescription.CashNames == CashNames.Subtract
                            ? long.Parse(cashDescription.Quantity)
                            : 0
                    )
                    .Sum();

                abstractCost += cash.TotalAbstract;
                subtractCost += cash.TotalSubtract;

                fund.Total += cash.Quantity;
            });

        fund.Total = fund.Total + abstractCost - subtractCost;
        fund.Cashes = Mapper.Map<List<Cash>>(
            fund.Cashes.OrderByDescending(cash => cash.Created)
        );
        return fund;
    }

    public Fund Create(FundDataTransformer.Create create)
    {
        Fund fund = Mapper.Map<Fund>(create);
        fund.ProfileId = _jwtService.Information().ProfileId;

        _databaseContext.Add(fund);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            nameof(HubMethodName.FUND),
            nameof(Object)
        );
        return fund;
    }

    public Fund Info(Guid fundId)
    {
        Fund fund =
            _databaseContext
                .Fund.Include(fund => fund.Cashes)
                .ThenInclude(cash => cash.CashDescriptions)
                .Where(fund =>
                    fund.Id == fundId
                    && fund.ProfileId == _jwtService.Information().ProfileId
                )
                .FirstOrDefault()
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUNT_FUNDS
            );
        MapData(fund);
        return fund;
    }

    public string Remove(Guid fundId)
    {
        Fund fund =
            _databaseContext
                .Fund.Where(fund =>
                    fund.Id == fundId
                    && fund.ProfileId == _jwtService.Information().ProfileId
                )
                .FirstOrDefault()
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUNT_FUNDS
            );

        _databaseContext.Remove(fund);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            nameof(HubMethodName.FUND),
            nameof(Object)
        );
        return string.Empty;
    }
}
