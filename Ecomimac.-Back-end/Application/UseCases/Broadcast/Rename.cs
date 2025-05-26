namespace ReferenceService;

public class RenameBroadcast(
    IBroadcastRepository broadcastRepository,
    IRealtimeBroadcast realtimeBroadcast
) : IRenameBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;

    public Broadcast Execute(Guid profileId, Guid broadcastId, string name)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );
        broadcast.Name = name;

        _broadcastRepository.Update(broadcast);
        _realtimeBroadcast.Information(profileId);

        return broadcast;
    }
}
