namespace ReferenceDatabase;

public class ExpenseCategory(string name, string description) : Entity, IEntity
{
    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Description { get; set; } = description;

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    public ICollection<Expense> Expenses { get; set; }

    public ICollection<ExpenseCategoryTag> ExpenseCategoryTags { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }
}
