namespace ReferenceDatabase;

[PrimaryKey(nameof(PromotionId), nameof(ProductId))]
public class PromotionProduct
{
    [ForeignKey(nameof(PromotionId))]
    public Guid PromotionId { get; set; }

    public Promotion Promotion { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Guid ProductId { get; set; }

    public Product BuyProduct { get; set; }

    [ForeignKey(nameof(FreeProductId))]
    public Guid FreeProductId { get; set; }

    [NotMapped]
    public Product FreeProduct { get; set; }

    [AllowNull]
    public int? MinQuantity { get; set; }

    [AllowNull]
    public int? Quantity { get; set; }

    [AllowNull]
    public int? MaxFreeQuantity { get; set; }
}
