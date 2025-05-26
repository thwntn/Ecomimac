namespace ReferenceInterface;

public interface IModeBroadcast
{
    IEnumerable<BroadcastObject.Channel> Execute();
}
