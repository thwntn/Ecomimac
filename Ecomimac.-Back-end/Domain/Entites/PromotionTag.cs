namespace ReferenceDatabase;

[PrimaryKey(nameof(PromotionId), nameof(TagId))]
public class PromotionTag(Guid promotionId, Guid tagId)
{
    [ForeignKey(nameof(PromotionId))]
    public Guid PromotionId { get; set; } = promotionId;

    public Promotion Promotion { get; set; }

    [ForeignKey(nameof(PromotionId))]
    public Guid TagId { get; set; } = tagId;

    public Tag Tag { get; set; }
}
