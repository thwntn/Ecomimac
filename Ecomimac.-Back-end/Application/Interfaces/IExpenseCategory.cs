namespace ReferenceInterface;

public interface IExpenseCategory
{
    Pagination<ExpenseCategory> List(
        Guid profileId,
        QueryOptions queryOptions
    );
    ExpenseCategory Create(
        Guid profileId,
        ExpenseCategoryDataTransformer.Create create
    );
    ExpenseCategoryObject.Counter Counter(Guid profileId);
    ExpenseCategory Update(
        Guid profileId,
        ExpenseCategoryDataTransformer.Update update
    );
    IEnumerable<Expense> Clone(Guid profileId, Guid fromId, Guid toId);
    ExpenseCategory Information(Guid profileId, Guid expenseCategoryId);
    Pagination<Expense> Expense(
        Guid profileId,
        Guid expenseCategoryId,
        QueryOptions queryOptions
    );
    IEnumerable<ExpenseCategoryTag> UpdateTag(
        Guid profileId,
        Guid expenseCategoryId,
        ExpenseCategoryDataTransformer.UpdateTag updateTag
    );
    string Remove(Guid profileId, Guid expenseCategoryId);
}
