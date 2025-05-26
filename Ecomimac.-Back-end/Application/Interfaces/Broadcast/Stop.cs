namespace ReferenceInterface;

public interface IStopBroadcast
{
    Broadcast Execute(Guid profileId, Guid broadcastId);
}
