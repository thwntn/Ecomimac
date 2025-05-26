namespace ReferenceService;

public class CounterHistory(IBroadcastRepository broadcastRepository)
    : ICounterHistory
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;

    public HistoryObject.Counter Execute(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        int estimatePrice = 650;
        return new(
            broadcast.Times,
            broadcast.NumberSuccess,
            broadcast.NumberFailed,
            estimatePrice
        );
    }
}
