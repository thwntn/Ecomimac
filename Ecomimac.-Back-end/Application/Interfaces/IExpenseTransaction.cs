namespace ReferenceInterface;

public interface IExpenseTransaction
{
    Pagination<ExpenseTransaction> List(
        Guid profileId,
        Guid categoryId,
        QueryOptions queryOptions
    );
    ExpenseTransaction Create(
        Guid profileId,
        Guid expenseId,
        ExpenseTransactionDataTransformer.Create create
    );
    IEnumerable<ExpenseTransaction> WithCategory(Guid expenseId);
    string Remove(Guid profileId, List<Guid> expenseCategoryTransactionIds);
    IEnumerable<ExpenseTransactionObject.Counter> Counter(
        Guid profileId,
        Guid expenseCategoryId
    );
    ExpenseTransaction Update(ExpenseTransactionDataTransformer.Update update);
    IEnumerable<ExpenseTransactionObject.Statistic> Statistic(
        Guid profileId,
        Guid categoryId
    );
    IEnumerable<Dashboard.Value> Expenditure(Guid profileId, Guid categoryId);
}
