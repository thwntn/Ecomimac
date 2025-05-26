namespace ReferenceService;

public class RealtimeBroadcast(IConnectionHub connectionHub)
    : IRealtimeBroadcast
{
    private readonly IConnectionHub _connectionHub = connectionHub;

    public void Execute(Guid profileId) =>
        _connectionHub.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.BROADCAST),
            default
        );

    public void Information(Guid profileId)
    {
        _connectionHub.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.BROADCAST_INFORMATION),
            default
        );

        Execute(profileId);
    }
}
