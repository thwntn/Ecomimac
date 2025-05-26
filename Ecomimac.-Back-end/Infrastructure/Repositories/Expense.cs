namespace ReferenceRepository;

public class ExpenseRepository(DatabaseContext databaseContext)
    : Repository<Expense>(databaseContext),
        IExpenseRepository { }
