namespace ReferenceInterface;

public interface IProduct
{
    Pagination<Product> List(Guid profileId, QueryOptions queryOptions);
    Product Create(Guid profileId, ProductDataTransformer.Create create);
    Task<Product> UpdateImage(
        Guid profileId,
        Guid productId,
        IFormFileCollection files
    );
    string Remove(Guid profileId, IEnumerable<Guid> productIds);
    Product Info(Guid productId);
    Product Update(
        Guid profileId,
        Guid productId,
        ProductDataTransformer.Update update
    );
}
