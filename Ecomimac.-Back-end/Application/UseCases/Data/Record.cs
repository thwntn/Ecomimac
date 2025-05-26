namespace ReferenceService;

public class RecordData(
    IFromCustomer fromCustomer,
    IFromImport fromImport,
    IDataRepository dataRepository
) : IRecordData
{
    private readonly IFromImport _fromImport = fromImport;
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly IFromCustomer _fromCustomer = fromCustomer;

    public Pagination<Import> Execute(
        Guid profileId,
        Guid dataId,
        QueryOptions queryOptions
    )
    {
        Data data =
            _dataRepository
                .Include(data => data.Filters)
                .FirstOrDefault(data =>
                    data.Id == dataId && data.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        Pagination<Import> recordAndCounter = _fromImport.Execute(
            data,
            queryOptions
        );
        //
        //  Summary:
        //      Case data from customer system (not import record & get realtime record on system)
        //
        //  Returns:
        //
        if (data.Type is not ReferenceShared.DataType.FROM_CUSTOMER)
            return recordAndCounter;

        //
        //  Summary:
        //      Get record from CRM
        //
        //  Returns:
        //
        DataObject.FromCustomer fromCustomer = _fromCustomer.Execute(
            data,
            queryOptions
        );

        return fromCustomer.Pagination;
    }
}
