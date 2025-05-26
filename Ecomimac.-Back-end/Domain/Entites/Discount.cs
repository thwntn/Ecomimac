namespace ReferenceDatabase;

public class Discount : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [DefaultValue(DiscountStatus.Active)]
    public DiscountStatus Status { get; set; }

    [AllowNull]
    public DateTime? FromDate { get; set; }

    [AllowNull]
    public DateTime? ToDate { get; set; }

    [Required]
    public string Code { get; set; }

    [Required]
    public DiscountCode DiscountCode { get; set; }

    [Required]
    public DiscountType DiscountType { get; set; }

    [Required]
    public DiscountTimeFrameType DiscountTimeFrameType { get; set; }

    [Required]
    public DiscountQuantityType DiscountQuantityType { get; set; }

    [AllowNull]
    [DefaultValue(0)]
    public long Quantity { get; set; }

    [AllowNull]
    [DefaultValue(0)]
    public long Used { get; set; }

    [Required]
    [DefaultValue(0)]
    public double Percent { get; set; }

    [Required]
    [DefaultValue(0)]
    public double MaxAmount { get; set; }

    [Required]
    [DefaultValue(0)]
    public int Amount { get; set; }

    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public List<InvoiceDiscount> InvoiceDiscounts { get; set; }

    public List<DiscountTag> DiscountTags { get; set; }
}
