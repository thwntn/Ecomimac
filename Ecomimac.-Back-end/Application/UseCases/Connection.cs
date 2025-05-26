namespace ReferenceService;

public class ConnectionHub : IConnectionHub
{
    private static readonly Dictionary<
        string,
        List<ClientHub>
    > _connectionHubs = [];

    public void Initialize(
        IClientProxy clientProxy,
        string ConnectionHubId,
        string connectId
    )
    {
        if (_connectionHubs.TryGetValue(connectId, out List<ClientHub> value))
            value.Add(new(connectId, ConnectionHubId, clientProxy));
        else
            _connectionHubs.Add(
                connectId,
                [new(connectId, ConnectionHubId, clientProxy)]
            );
    }

    public void Disconnect(string ConnectionHubId)
    {
        List<ClientHub> hubs =
        [
            .. _connectionHubs.SelectMany(item => item.Value),
        ];
        IEnumerable<ClientHub> hub = hubs.Where(item =>
            item.ConnectionHubId == ConnectionHubId
        );
        if (hub.Count() is not 0)
            hubs.Remove(hub.First());
    }

    public void Invoke(string connectId, string hubMethodName, object data)
    {
        if (_connectionHubs.TryGetValue(connectId, out var ConnectionHub))
            ConnectionHub.ForEach(async item =>
                await item.clientProxy.SendAsync(hubMethodName, data)
            );
    }

    public async void Invoke(string hubMethodName, object data)
    {
        IEnumerable<ClientHub> hubs = _connectionHubs.SelectMany(item =>
            item.Value
        );
        foreach (ClientHub item in hubs)
            await item.clientProxy.SendAsync(hubMethodName, data);
    }
}
