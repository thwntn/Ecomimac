namespace ReferenceDatabase;

[PrimaryKey(nameof(ExpenseCategoryId), nameof(TagId))]
public class ExpenseCategoryTag(Guid expenseCategoryId, Guid tagId)
{
    [ForeignKey(nameof(ExpenseCategoryId))]
    public Guid ExpenseCategoryId { get; set; } = expenseCategoryId;

    public ExpenseCategory ExpenseCategory { get; set; }

    [ForeignKey(nameof(TagId))]
    public Guid TagId { get; set; } = tagId;

    public Tag Tag { get; set; }
}
