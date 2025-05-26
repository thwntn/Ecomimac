namespace ReferenceRepository;

public class ExpenseTransactionRepository(DatabaseContext databaseContext)
    : Repository<ExpenseTransaction>(databaseContext),
        IExpenseTransactionRepository { }
