namespace ReferenceService;

public class ExpenseService(
    DatabaseContext databaseContext,
    IExpenseRepository expenseRepository,
    IConnectionHub ConnectionHub,
    ICache cacheService,
    IActivity activityService
) : IExpense
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly ICache _cacheService = cacheService;
    private readonly IConnectionHub _connectionHubService = ConnectionHub;
    private readonly IActivity _activityService = activityService;
    private readonly IExpenseRepository _expenseRepository = expenseRepository;

    public Pagination<Expense> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Expense> expense = _databaseContext
            .Expense.Include(expense => expense.ExpenseTransactions)
            .Where(expense => expense.ProfileId == profileId)
            .OrderByDescending(expense => expense.Created);

        return new(expense, queryOptions);
    }

    public Expense Information(Guid profileId, Guid categoryId)
    {
        Expense expense =
            _databaseContext
                .Expense.Include(expense => expense.ExpenseTransactions)
                .FirstOrDefault(expense =>
                    expense.Id == categoryId && expense.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE
            );

        expense.TotalCost = expense
            .ExpenseTransactions.Select(expenseCategoryTransaction =>
                long.Parse(expenseCategoryTransaction.Amount)
            )
            .Sum();

        return expense;
    }

    public Expense Create(Guid profileId, ExpenseDataTransformer.Create create)
    {
        Expense expense = Mapper.Map<Expense>(create);
        expense.ProfileId = profileId;

        _databaseContext.Add(expense);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            nameof(HubMethodName.EXPENSE),
            nameof(Object)
        );

        string nameofCache = nameof(Expense) + profileId;
        _cacheService.Reset(nameofCache);
        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.EXPENSE_CREATE),
                    Mapper.Serialize(expense)
                ),
            ]
        );
        return expense;
    }

    public Expense Update(Guid profileId, ExpenseDataTransformer.Update update)
    {
        Expense expense =
            _databaseContext.Expense.FirstOrDefault(category =>
                category.ProfileId == profileId && category.Id == update.Id
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE
            );

        Expense mapped = Mapper.Merge(expense, update);
        _databaseContext.Update(mapped);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            nameof(HubMethodName.EXPENSE),
            nameof(Object)
        );

        string nameofCache = nameof(Expense) + profileId;
        _cacheService.Reset(nameofCache);
        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.EXPENSE_UPDATE),
                    Mapper.Serialize(expense)
                ),
            ]
        );
        return mapped;
    }

    public string Remove(Guid profileId, IEnumerable<Guid> expenseIds)
    {
        IEnumerable<Expense> expense =
            _databaseContext.Expense.Where(expense =>
                expenseIds.Any(expenseId => expenseId == expense.Id)
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE
            );
        _databaseContext.RemoveRange(expense);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Expense) + profileId;
        _cacheService.Reset(nameofCache);

        _connectionHubService.Invoke(
            nameof(HubMethodName.EXPENSE),
            nameof(Object)
        );

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.EXPENSE_CREATE),
                    Mapper.Serialize(expense)
                ),
            ]
        );
        return string.Empty;
    }

    public IEnumerable<int> Filter(Guid profileId)
    {
        var group = _databaseContext
            .Expense.Where(expense => expense.ProfileId == profileId)
            .GroupBy(
                expense => expense.DateTime.Month,
                (key, groupData) => key
            );

        return group;
    }

    public ExpenseObject.Banner Banner(Guid profileId, Guid expenseCategoryId)
    {
        IEnumerable<Fund> funds = _databaseContext
            .Fund.Include(fund => fund.Cashes)
            .Where(fund => fund.ProfileId == profileId);

        long fundCost = funds
            .SelectMany(fund => fund.Cashes)
            .Select(cash => cash.Quantity)
            .Sum();

        IEnumerable<ExpenseTransaction> ExpenseTransactions =
            _databaseContext.ExpenseTransaction.Where(
                expenseCategoryTransaction =>
                    expenseCategoryTransaction.Expense.ProfileId == profileId
            );
        long expenseCategoryTransactionCost = ExpenseTransactions
            .Select(cash => long.Parse(cash.Amount))
            .Sum();

        long costInMoth = _databaseContext
            .ExpenseTransaction.Where(expenseCategoryTransaction =>
                expenseCategoryTransaction.Expense.ProfileId == profileId
                && expenseCategoryTransaction.Expense.ExpenseCategoryId
                    == expenseCategoryId
            )
            .ToList()
            .Sum(expenseCategoryTransaction =>
                long.Parse(expenseCategoryTransaction.Amount)
            );

        long budget = _databaseContext
            .Expense.Where(expense =>
                expense.ExpenseCategoryId == expenseCategoryId
            )
            .Select(expense => expense.Budget)
            .Sum();

        ExpenseObject.Banner banner = new(
            costInMoth,
            fundCost,
            fundCost - expenseCategoryTransactionCost,
            budget
        );

        return banner;
    }
}
