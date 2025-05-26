namespace ReferenceService;

public class CloneBroadcast(
    IBroadcastRepository broadcastRepository,
    IRealtimeBroadcast realtimeBroadcast
) : ICloneBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;

    private static string CreateName(string name) =>
        $"{name} (Bản sao {Timebase.Now()})";

    public Broadcast Execute(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );
        //  Summary:
        //      Create new name, process, time created
        //
        broadcast.Name = CreateName(broadcast.Name);
        broadcast.Process = BroadcastProcess.DRAFT;
        broadcast.Created = Timebase.Now();
        broadcast.Id = Guid.Empty;
        //  Summary:
        //      Reset number success, number failed, times
        //
        broadcast.NumberSuccess = 0;
        broadcast.NumberFailed = 0;
        broadcast.Times = 0;

        _broadcastRepository.Create(broadcast);
        _realtimeBroadcast.Execute(profileId);
        return broadcast;
    }
}
