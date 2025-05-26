namespace ReferenceInterface;

public interface IListData
{
    Pagination<Data> Execute(Guid profileId, QueryOptions queryOptions);
}
