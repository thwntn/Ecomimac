namespace ReferenceService;

public class RealtimeData(IConnectionHub connectionHub) : IRealtimeData
{
    private readonly IConnectionHub _connectionHub = connectionHub;

    public void Execute(Guid profileId)
    {
        _connectionHub.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.DATA),
            default
        );
    }

    public void UpdateInformation(Guid profileId)
    {
        _connectionHub.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.DATA_INFORMATION),
            default
        );
    }
}
