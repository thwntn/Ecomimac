namespace ReferenceDatabase;

public class Expense(string name, string description) : Entity, IEntity
{
    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Description { get; set; } = description;

    [Required]
    [DefaultValue(0)]
    public long Budget { get; set; }

    [Required]
    public DateTime DateTime { get; set; }

    public long TotalCost;

    [Required]
    public ICollection<ExpenseTransaction> ExpenseTransactions { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    [ForeignKey(nameof(ExpenseCategoryId))]
    public Guid ExpenseCategoryId { get; set; }

    public ExpenseCategory ExpenseCategory { get; set; }
}
