namespace ReferenceInterface;

public interface ILoopBroadcast
{
    Task<Broadcast> Execute(Guid profileId, Guid broadcastId);
}
