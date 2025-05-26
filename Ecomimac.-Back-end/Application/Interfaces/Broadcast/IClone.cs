namespace ReferenceInterface;

public interface ICloneBroadcast
{
    Broadcast Execute(Guid profileId, Guid broadcastId);
}
