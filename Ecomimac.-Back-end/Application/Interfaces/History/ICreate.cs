namespace ReferenceInterface;

public interface ICreateHistory
{
    Task<IEnumerable<History>> Execute(
        Guid broadcastId,
        IEnumerable<History> histories
    );
}
