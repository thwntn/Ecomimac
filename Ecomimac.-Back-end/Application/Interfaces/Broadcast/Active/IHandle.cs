namespace ReferenceInterface;

public interface IHandleActiveBroadcast
{
    Broadcast Information(Guid profileId, Guid broadcastId);
    List<Dictionary<string, string>> ContactExtension(
        Guid profileId,
        Guid dataId,
        QueryOptions queryOptions
    );
    string MapContent(Broadcast broadcast, Dictionary<string, string> source);
}
