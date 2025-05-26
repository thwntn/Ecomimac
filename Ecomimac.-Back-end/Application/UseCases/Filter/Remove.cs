namespace ReferenceService;

public class RemoveFilter(
    IFilterRepository filterRepository,
    IRealtimeData realtimeData
) : IRemoveFilter
{
    private readonly IFilterRepository _filterRepository = filterRepository;
    private readonly IRealtimeData _realtimeData = realtimeData;

    public string Execute(Guid profileId, Guid filterId)
    {
        Filter filter =
            _filterRepository
                .Raw()
                .FirstOrDefault(filter =>
                    filter.Data.ProfileId == profileId && filter.Id == filterId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUNT_FILTER
            );

        _filterRepository.Remove(filter);
        _realtimeData.UpdateInformation(profileId);
        return string.Empty;
    }
}
