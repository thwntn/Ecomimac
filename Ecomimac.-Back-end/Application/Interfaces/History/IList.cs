namespace ReferenceInterface;

public interface IListHistory
{
    Task<Pagination<HistoryObject.Response>> Execute(
        Guid profileId,
        Guid broadcastId,
        QueryOptions queryOptions
    );
}
