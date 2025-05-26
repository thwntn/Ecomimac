namespace ReferenceDatabase;

public class CashDescription(string name, string quantity)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public DateTime Updated { get; set; } = new();

    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Quantity { get; set; } = quantity;

    [Required]
    public CashNames CashNames { get; set; }

    [ForeignKey(nameof(CashId))]
    public Guid CashId { get; set; }

    public Cash Cash { get; set; }
}
