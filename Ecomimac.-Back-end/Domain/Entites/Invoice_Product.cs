namespace ReferenceDatabase;

[PrimaryKey(nameof(InvoiceId), nameof(ProductId))]
public class InvoiceProduct(
    Guid invoiceId,
    Guid productId,
    long price,
    long quantity
) : Entity, IEntity
{
    [ForeignKey(nameof(InvoiceId))]
    public Guid InvoiceId { get; set; } = invoiceId;

    public Invoice Invoice { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Guid ProductId { get; set; } = productId;

    public Product Product { get; set; }

    [Required]
    public long Price { get; set; } = price;

    [Required]
    public long Quantity { get; set; } = quantity;
}
