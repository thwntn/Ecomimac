namespace ReferenceDatabase;

[PrimaryKey(nameof(ProductId), nameof(TagId))]
public class ProductTag(Guid productId, Guid tagId)
{
    [ForeignKey(nameof(ProductId))]
    public Guid ProductId { get; set; } = productId;

    public Product Product { get; set; }

    [ForeignKey(nameof(TagId))]
    public Guid TagId { get; set; } = tagId;

    public Tag Tag { get; set; }
}
