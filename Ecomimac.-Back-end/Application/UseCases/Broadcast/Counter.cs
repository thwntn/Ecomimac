namespace ReferenceService;

public class CounterBroadcast(IBroadcastRepository broadcastRepository)
    : ICounterBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;

    public BroadcastObject.Counter Execute(Guid profileId)
    {
        IEnumerable<Broadcast> broadcasts = _broadcastRepository.GetByCondition(
            broadcast => broadcast.ProfileId == profileId
        );
        int runningCount = broadcasts
            .Where(broadcast => broadcast.Process == BroadcastProcess.SENDING)
            .Count();

        int success = 0,
            failed = 0;
        int total = broadcasts
            .Select(broadcast =>
            {
                success += broadcast.NumberSuccess;
                failed += broadcast.NumberFailed;
                return broadcast.Times;
            })
            .Sum();

        int priceEstimate = 650;
        return new(
            total,
            success,
            failed,
            priceEstimate,
            broadcasts.Count(),
            runningCount
        );
    }
}
