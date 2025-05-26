namespace ReferenceInterface;

public interface IFromCustomer
{
    DataObject.FromCustomer Execute(Data data, QueryOptions queryOptions);
    IEnumerable<string> GetColumn();
}
