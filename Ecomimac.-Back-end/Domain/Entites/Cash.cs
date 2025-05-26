namespace ReferenceDatabase;

public class Cash(string name, long quantity)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public string Name { get; set; } = name;

    [Required]
    public bool IsActive { get; set; } = true;

    public long TotalAbstract;

    public long TotalSubtract;

    [Required]
    public long Quantity { get; set; } = quantity;

    [ForeignKey(nameof(FundId))]
    public Guid FundId { get; set; }

    public Fund Fund { get; set; }

    public ICollection<CashDescription> CashDescriptions { get; set; }
}
