namespace ReferenceRepository;

public class DataRepository(
    DatabaseContext databaseContext,
    IRealtimeData realtimeData
) : Repository<Data>(databaseContext), IDataRepository
{
    private readonly IRealtimeData _realtimeData = realtimeData;

    public Data ChangeStatus(Guid profileId, Guid dataId, DataStatus status)
    {
        //
        //  Summary:
        //      Get data record by id
        //
        //  Returns:
        //
        Data data = GetById(dataId);
        if (data.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        //
        //  Summary:
        //      Change status data record
        //
        //  Returns:
        //
        data.Status = status;
        Update(data);

        _realtimeData.Execute(profileId);
        return data;
    }
}
