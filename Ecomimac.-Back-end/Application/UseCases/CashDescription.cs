namespace ReferenceService;

public class CashDescriptionService(DatabaseContext databaseContext)
    : ICashDescription
{
    private readonly int QuantityRecent = 6;
    private readonly DatabaseContext _databaseContext = databaseContext;

    public IEnumerable<CashDescription> List(Guid profileId)
    {
        IEnumerable<CashDescription> cashDescriptions = _databaseContext
            .Fund.Include(fund => fund.Cashes)
            .ThenInclude(cash => cash.CashDescriptions)
            .Where(fund => fund.ProfileId == profileId)
            .SelectMany(fund => fund.Cashes)
            .SelectMany(cash => cash.CashDescriptions);
        return cashDescriptions;
    }

    public IEnumerable<CashDescription> Recent(Guid profileId)
    {
        IEnumerable<CashDescription> cashDescriptions = _databaseContext
            .Fund.Include(fund => fund.Cashes)
            .ThenInclude(cash => cash.CashDescriptions)
            .Where(fund => fund.ProfileId == profileId)
            .SelectMany(fund => fund.Cashes)
            .SelectMany(cash => cash.CashDescriptions)
            .OrderByDescending(cash => cash.Created)
            .Take(QuantityRecent);
        return cashDescriptions;
    }

    public CashDescription Create(
        Guid cashId,
        CashDescriptionDataTransformer.Create create
    )
    {
        CashDescription cashDescription = new(create.Name, create.Quantity)
        {
            CashNames = create.CashNames,
            CashId = cashId,
        };
        _databaseContext.Add(cashDescription);
        _databaseContext.SaveChanges();
        return cashDescription;
    }
}
