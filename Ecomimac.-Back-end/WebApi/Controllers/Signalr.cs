namespace ReferenceService;

public class SignalrController(IConnectionHub connect) : Hub
{
    private readonly IConnectionHub _connect = connect;

    public override Task OnDisconnectedAsync(Exception exception)
    {
        _connect.Disconnect(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }

    [HubMethodName(nameof(Initialize))]
    public void Initialize(object data)
    {
        ConnectDataTransformer.Connect connect =
            Mapper.Map<ConnectDataTransformer.Connect>(data);
        _connect.Initialize(
            Clients.Clients(Context.ConnectionId),
            Context.ConnectionId,
            connect.connectId
        );
    }
}
