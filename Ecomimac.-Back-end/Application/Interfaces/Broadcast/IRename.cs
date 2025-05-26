namespace ReferenceInterface;

public interface IRenameBroadcast
{
    Broadcast Execute(Guid profileId, Guid broadcastId, string name);
}
