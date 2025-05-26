namespace ReferenceInterface;

public interface IFromImport
{
    Pagination<Import> Execute(Data data, QueryOptions queryOptions);
}
