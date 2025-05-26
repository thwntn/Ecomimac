namespace ReferenceRepository;

public class ExpenseCategoryRepository(DatabaseContext databaseContext)
    : Repository<ExpenseCategory>(databaseContext),
        IExpenseCategoryRepository { }
