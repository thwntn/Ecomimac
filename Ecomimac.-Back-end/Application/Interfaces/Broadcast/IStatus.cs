namespace ReferenceInterface;

public interface IStatusBroadcast
{
    IEnumerable<BroadcastObject.Status> Execute();
}
