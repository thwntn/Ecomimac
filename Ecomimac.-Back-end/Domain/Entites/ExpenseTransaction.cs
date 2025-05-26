namespace ReferenceDatabase;

public class ExpenseTransaction : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public DateTime DateTime { get; set; }

    [Required]
    public string Amount { get; set; }

    [ForeignKey(nameof(ExpenseId))]
    public Guid ExpenseId { get; set; }

    public Expense Expense { get; set; }
}
