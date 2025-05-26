namespace ReferenceInterface;

public interface IListContent
{
    Pagination<Content> Execute(
        Guid profileId,
        QueryOptions queryOptions
    );
}
