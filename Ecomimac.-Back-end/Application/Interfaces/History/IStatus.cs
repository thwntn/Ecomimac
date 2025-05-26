namespace ReferenceInterface;

public interface IStatusHistory
{
    IEnumerable<HistoryObject.Status> Execute();
}
