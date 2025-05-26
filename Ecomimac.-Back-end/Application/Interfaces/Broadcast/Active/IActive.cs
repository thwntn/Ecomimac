namespace ReferenceInterface;

public interface IActiveBroadcast
{
    Task<string> Execute(Guid profileId, Guid broadcastId);
}
