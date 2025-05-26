namespace ReferenceInterface;

public interface ICreateBroadcastOpenIntegrateSession
{
    OpenIntegrateSession Execute(Guid profileId, Guid broadcastId);
}
