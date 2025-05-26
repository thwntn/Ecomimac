namespace ReferenceService;

public class StopBroadcast(
    IBroadcastRepository broadcastRepository,
    IRealtimeBroadcast realtimeBroadcast
) : IStopBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;

    public Broadcast Execute(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        broadcast.Process = BroadcastProcess.CANCEL;
        _broadcastRepository.Update(broadcast);

        _realtimeBroadcast.Information(profileId);
        return broadcast;
    }
}
