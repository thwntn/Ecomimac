namespace ReferenceInterface;

public interface ICustomer
{
    Pagination<Customer> List(Guid profileId, QueryOptions queryOptions);
    Customer Create(Guid profileId, CustomerDataTransformer.Create create);
    Task<Customer> AddImage(Guid profileId, Guid customerId, IFormFile file);
    string Remove(Guid profileId, Guid customerId);
    Customer Info(Guid customerId);
    public Customer Update(
        Guid profileId,
        CustomerDataTransformer.Update update
    );
    IEnumerable<Customer> Potential(Guid profileId);
    Pagination<Invoice> RecentInvoice(
        Guid profileId,
        Guid customerId,
        QueryOptions queryOptions
    );
}
