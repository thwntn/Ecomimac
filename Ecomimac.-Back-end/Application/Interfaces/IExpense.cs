namespace ReferenceInterface;

public interface IExpense
{
    Pagination<Expense> List(Guid profileId, QueryOptions filterList);
    Expense Create(Guid profileId, ExpenseDataTransformer.Create create);
    string Remove(Guid profileId, IEnumerable<Guid> expenseIds);
    Expense Information(Guid profileId, Guid categoryId);
    IEnumerable<int> Filter(Guid profileId);
    Expense Update(Guid profileId, ExpenseDataTransformer.Update update);
    ExpenseObject.Banner Banner(Guid profileId, Guid expenseCategoryId);
}
