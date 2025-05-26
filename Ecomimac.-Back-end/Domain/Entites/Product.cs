namespace ReferenceDatabase;

public class Product : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Code { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string HtmlDetail { get; set; }

    [Required]
    public long Price { get; set; }

    [AllowNull]
    public int SalePercent { get; set; }

    [AllowNull]
    public long? MaxSaleAmount { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public ICollection<ImageProduct> ImageProducts { get; set; }

    public ICollection<ProductTag> ProductTags { get; set; }

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public ICollection<InvoiceProduct> InvoiceProducts { get; set; }

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public ICollection<SaleProgramProduct> SaleProgramProducts { get; set; }

    [DeleteBehavior(DeleteBehavior.NoAction)]
    public ICollection<PromotionProduct> PromotionProducts { get; set; }
}
