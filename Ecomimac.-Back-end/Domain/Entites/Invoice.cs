namespace ReferenceDatabase;

public class Invoice : Entity, IEntity
{
    [Required]
    public string Code { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public long BasePrice { get; set; }

    [Required]
    public long DiscountPrice { get; set; }

    [Required]
    public long LatestPrice { get; set; }

    [Required]
    public MonetaryUnit MonetaryUnit { get; set; }

    [Required]
    [DefaultValue(false)]
    public bool GenerateByAutomation { get; set; }

    [Required]
    public ICollection<InvoiceProduct> InvoiceProducts { get; set; }

    public ICollection<InvoiceDiscount> InvoiceDiscounts { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public InvoiceStatus Status { get; set; }

    [AllowNull]
    [ForeignKey(nameof(CustomerId))]
    public Guid? CustomerId { get; set; }

    public Customer Customer { get; set; }

    public PaymentMethod PaymentMethod { get; set; }
}
