namespace ReferenceDatabase;

[PrimaryKey(nameof(CustomerId), nameof(TagId))]
public class CustomerTag(Guid customerId, Guid tagId)
{
    [ForeignKey(nameof(CustomerId))]
    public Guid CustomerId { get; set; } = customerId;

    public Customer Customer { get; set; }

    [ForeignKey(nameof(TagId))]
    public Guid TagId { get; set; } = tagId;

    public Tag Tag { get; set; }
}
