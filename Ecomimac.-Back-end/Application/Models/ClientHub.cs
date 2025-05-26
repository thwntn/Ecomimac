namespace ReferenceModel;

public class ClientHub(
    string accountId,
    string ConnectionHubId,
    IClientProxy clientProxy
)
{
    public IClientProxy clientProxy = clientProxy;
    public string ConnectionHubId = ConnectionHubId;
    public string accountId = accountId;
}
