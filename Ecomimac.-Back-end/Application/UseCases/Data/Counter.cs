namespace ReferenceService;

public class CounterData(
    IDataRepository dataRepository,
    IImportRepository importRepository
) : ICounterData
{
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly IImportRepository _importRepository = importRepository;
    private readonly int QUANTITY_DEFAULT = 2;

    public DataObject.Counter Execute(Guid profileId)
    {
        int quantityData = _dataRepository
            .GetByCondition(data =>
                data.ProfileId == profileId && data.DeleteBy == null
            )
            .AsQueryable()
            .Count();

        int quantityImport = _importRepository
            .GetByCondition(data =>
                data.Data.ProfileId == profileId && data.Data.DeleteBy == null
            )
            .AsQueryable()
            .Count();

        IEnumerable<Data> recent = _dataRepository
            .GetByCondition(data =>
                data.ProfileId == profileId && data.DeleteBy == null
            )
            .AsQueryable()
            .OrderByDescending(data => data.Updated)
            .Take(QUANTITY_DEFAULT);

        return new(quantityData, quantityImport, recent);
    }
}
