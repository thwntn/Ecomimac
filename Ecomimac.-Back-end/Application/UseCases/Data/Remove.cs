namespace ReferenceService;

public class RemoveData(
    IDataRepository dataRepository,
    IRealtimeData realtimeData
) : IRemoveData
{
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly IRealtimeData _realtimeData = realtimeData;

    public string Execute(Guid profileId, Guid dataId)
    {
        Data data = _dataRepository.GetById(dataId);
        if (data.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        _dataRepository.SoftRemove(data, profileId);
        _realtimeData.Execute(profileId);

        return string.Empty;
    }
}
