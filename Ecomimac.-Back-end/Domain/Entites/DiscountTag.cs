namespace ReferenceDatabase;

[PrimaryKey(nameof(DiscountId), nameof(TagId))]
public class DiscountTag(Guid discountId, Guid tagId)
{
    [ForeignKey(nameof(DiscountId))]
    public Guid DiscountId { get; set; } = discountId;

    public Discount Discount { get; set; }

    [ForeignKey(nameof(TagId))]
    public Guid TagId { get; set; } = tagId;

    public Tag Tag { get; set; }
}
