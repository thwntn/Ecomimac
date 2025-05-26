namespace ReferenceInterface;

public interface IPromotion
{
    Pagination<Promotion> List(Guid profileId, QueryOptions queryOptions);
    Promotion Create(Guid profileId, PromotionDataTransformer.Create create);
    Promotion Update(Guid profileId, PromotionDataTransformer.Update update);
    string Remove(Guid profileId, Guid promotionId);
    Promotion Information(Guid profileId, Guid promotionId);
}
