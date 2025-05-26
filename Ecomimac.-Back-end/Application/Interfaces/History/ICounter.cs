namespace ReferenceInterface;

public interface ICounterHistory
{
    HistoryObject.Counter Execute(Guid profileId, Guid broadcastId);
}
