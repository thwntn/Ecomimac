namespace ReferenceInterface;

public interface IUpdateReferenceBroadcast
{
    Broadcast Execute(
        Guid profileId,
        Guid broadcastId,
        BroadcastDataTransformerObject.UpdateReferenceData updateReferenceData
    );
    Broadcast UpdateData(
        Guid profileId,
        Guid broadcastId,
        BroadcastDataTransformerObject.UpdateData updateData
    );
    Broadcast UpdateContent(
        Guid profileId,
        Guid broadcastId,
        BroadcastDataTransformerObject.UpdateContent updateContent
    );
}
