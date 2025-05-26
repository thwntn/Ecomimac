namespace ReferenceInterface;

public interface IBroadcast
{
    Pagination<Broadcast> List(Guid profileId, QueryOptions queryOptions);
    Broadcast Create(
        Guid profileId,
        BroadcastDataTransformerObject.Create create
    );
    Broadcast Information(Guid profileId, Guid broadcastId);
    string Remove(Guid profileId, Guid broadcastId);
    // Broadcast UpdateContent(
    //     Guid profileId,
    //     Guid broadcastId,
    //     BroadcastDataTransformerObject.UpdateContent updateContent
    // );
}
