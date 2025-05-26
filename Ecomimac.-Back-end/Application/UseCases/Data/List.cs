namespace ReferenceService;

public class ListData(
    IDataRepository dataRepository,
    IImportRepository importRepository,
    ICustomerRepository customerRepository
) : IListData
{
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly ICustomerRepository _customerRepository =
        customerRepository;
    private readonly IImportRepository _importRepository = importRepository;

    public Pagination<Data> Execute(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IEnumerable<Data> data = _dataRepository
            .Include(data => data.Profile)
            .Where(data => data.ProfileId == profileId && data.DeleteBy == null)
            .OrderByDescending(data => data.Created);

        Pagination<Data> recordAndCounter = new(
            data.AsQueryable(),
            queryOptions
        );
        //  Summary:
        //      Count customer & record in import
        IEnumerable<DataObject.Count> counts = Counter(
            recordAndCounter.Data.Select(data => data.Id)
        );
        int customerCount = _customerRepository
            .GetByCondition(customer => customer.ProfileId == profileId)
            .Count();

        //  Summary:
        //      Mapping counter to data
        recordAndCounter.Data = Mapper.Map<List<Data>>(
            recordAndCounter.Data.Select(item =>
            {
                int quantity = 0;

                //  Summary:
                //      Count quantity in case import from data
                DataObject.Count count = counts.FirstOrDefault(count =>
                    count.Id == item.Id
                );
                if (count is not null)
                    quantity = count.Quantity;

                //  Summary:
                //      Count quantity customer in case import from customer
                if (item.Type is ReferenceShared.DataType.FROM_CUSTOMER)
                    quantity = customerCount;

                item.QuantityRecord = quantity;
                return item;
            })
        );

        //  Summary:
        //      Pagination data
        return recordAndCounter;
    }

    public IEnumerable<DataObject.Count> Counter(IEnumerable<Guid> dataIds)
    {
        IEnumerable<DataObject.Count> counts = _importRepository
            .GetByCondition(import => dataIds.Contains(import.DataId))
            .GroupBy(import => import.DataId)
            .Select(group => new DataObject.Count(group.Key, group.Count()));

        return counts;
    }
}
