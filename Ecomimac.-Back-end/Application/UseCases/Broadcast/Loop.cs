using System.Threading.Tasks;

namespace ReferenceService;

public class LoopBroadcast(
    IBroadcastRepository broadcastRepository,
    IActiveBroadcast activeBroadcast,
    IRealtimeBroadcast realtimeBroadcast
) : ILoopBroadcast
{
    private readonly IActiveBroadcast _activeBroadcast = activeBroadcast;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;

    public async Task<Broadcast> Execute(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        await _activeBroadcast.Execute(profileId, broadcast.Id);
        _realtimeBroadcast.Information(profileId);

        return broadcast;
    }
}
