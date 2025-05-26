namespace ReferenceInterface;

public interface IDiscount
{
    Pagination<Discount> List(
        Guid profileId,
        DiscountDataTransformer.DiscountQuery discountQuery
    );
    Discount Create(Guid profileId, DiscountDataTransformer.Create create);
    Discount ChangeStatus(
        Guid profileId,
        Guid discountId,
        DiscountStatus discountStatus
    );
    string Remove(Guid profileId, Guid discountId);
    DiscountObject.Counter Info(Guid discountId);
    Discount Update(Guid profileId, DiscountDataTransformer.Update update);
    IEnumerable<Discount> Counter(Guid profileId);
    Pagination<InvoiceDiscount> Invoice(
        Guid profileId,
        Guid discountId,
        QueryOptions queryOptions
    );
    IEnumerable<Discount> Recent(Guid profileId);
    IEnumerable<DiscountObject.Chart> Chart(Guid profileId, Guid discountId);
}
