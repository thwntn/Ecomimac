namespace ReferenceService;

public class RemoveBroadcast(
    IBroadcastRepository broadcastRepository,
    IRealtimeBroadcast realtimeBroadcast
) : IRemoveBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;

    public string Execute(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        _broadcastRepository.SoftRemove(broadcast, profileId);
        _realtimeBroadcast.Execute(profileId);

        return string.Empty;
    }
}
