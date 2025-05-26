namespace ReferenceInterface;

public interface IConnectionHub
{
    void Initialize(
        IClientProxy clientProxy,
        string ConnectionHubId,
        string connectId
    );
    void Disconnect(string ConnectionHubId);
    void Invoke(string connectId, string hubMethodName, object data);
    void Invoke(string hubMethodName, object data);
}
