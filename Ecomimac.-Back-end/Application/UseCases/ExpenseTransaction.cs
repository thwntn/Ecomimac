namespace ReferenceService;

public class ExpenseTransactionService(
    DatabaseContext databaseContext,
    IConnectionHub connectionHubService,
    ICache cacheService,
    IActivity activityService,
    INotification notificationService,
    IExpenseTransactionRepository expenseTransactionRepository
) : IExpenseTransaction
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly ICache _cacheService = cacheService;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;
    private readonly IActivity _activityService = activityService;
    private readonly INotification _notificationService = notificationService;
    private readonly IExpenseTransactionRepository _expenseTransactionRepository =
        expenseTransactionRepository;

    public ExpenseTransaction Information(Guid expenseTransactionId)
    {
        ExpenseTransaction expenseTransaction =
            _databaseContext.ExpenseTransaction.FirstOrDefault(
                expenseTransaction =>
                    expenseTransaction.Id == expenseTransactionId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_TRANSACTION
            );

        return expenseTransaction;
    }

    public Pagination<ExpenseTransaction> List(
        Guid profileId,
        Guid categoryId,
        QueryOptions queryOptions
    )
    {
        IEnumerable<ExpenseTransaction> expenseTransactions =
            _databaseContext.ExpenseTransaction.OrderByDescending(
                expenseTransaction => expenseTransaction.Created
            );

        return new(
            expenseTransactions
                .Where(expenseTransaction =>
                    expenseTransaction.ExpenseId == categoryId
                )
                .AsQueryable(),
            queryOptions
        );
    }

    public IEnumerable<ExpenseTransaction> WithCategory(Guid expenseId)
    {
        IEnumerable<ExpenseTransaction> expenseTransactions =
            _databaseContext.ExpenseTransaction.Where(expenseTransaction =>
                expenseTransaction.ExpenseId == expenseId
            );
        return expenseTransactions;
    }

    public ExpenseTransaction Create(
        Guid profileId,
        Guid expenseId,
        ExpenseTransactionDataTransformer.Create create
    )
    {
        ExpenseTransaction expenseTransaction =
            Mapper.Map<ExpenseTransaction>(create);
        expenseTransaction.ExpenseId = expenseId;
        expenseTransaction.Created = Timebase.Now();

        _databaseContext.Add(expenseTransaction);
        _databaseContext.SaveChanges();

        ResetCache(profileId);
        Refresh(profileId);

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.EXPENSE_TRANSACTION_CREATE),
                    Mapper.Serialize(expenseTransaction)
                ),
            ]
        );

        _notificationService.Add(
            profileId,
            profileId,
            NotificationNames.CREATED_EXPENSE_TRANSACTION,
            Mapper.Serialize(expenseTransaction)
        );
        return expenseTransaction;
    }

    public string Remove(Guid profileId, List<Guid> expenseTransactionIds)
    {
        IEnumerable<ExpenseTransaction> expenseTransactions =
            _databaseContext.ExpenseTransaction.Where(expenseTransaction =>
                expenseTransactionIds.Any(item => item == expenseTransaction.Id)
            );

        _databaseContext.RemoveRange(expenseTransactions);
        _databaseContext.SaveChanges();

        ResetCache(profileId);
        Refresh(profileId);

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.EXPENSE_TRANSACTION_DELETE),
                    Mapper.Serialize(expenseTransactions)
                ),
            ]
        );
        return string.Empty;
    }

    public IEnumerable<ExpenseTransactionObject.Counter> Counter(
        Guid profileId,
        Guid expenseCategoryId
    )
    {
        List<ExpenseTransactionObject.Counter> counters = [];

        DateTime dateTime = Timebase.Now();

        IEnumerable<Expense> expense = _databaseContext
            .Expense.Include(expense => expense.ExpenseTransactions)
            .Where(expense =>
                expense.ProfileId == profileId
                && expense.ExpenseCategoryId == expenseCategoryId
            )
            .OrderByDescending(item => item.Created);
        IEnumerable<ExpenseTransaction> expenseTransactions =
            expense.SelectMany(category => category.ExpenseTransactions);

        counters =
        [
            SubCounter(
                expenseCategoryId,
                expenseTransactions,
                ExpenseTransactionCounterNames.TODAY,
                dateTime
            ),
            SubCounter(
                expenseCategoryId,
                expenseTransactions,
                ExpenseTransactionCounterNames.WEEK,
                dateTime.AddDays(-Timebase.WEEK)
            ),
            SubCounter(
                expenseCategoryId,
                expenseTransactions,
                ExpenseTransactionCounterNames.MONTH,
                DateTime.MinValue
            ),
        ];

        return counters;
    }

    private ExpenseTransactionObject.Counter SubCounter(
        Guid expenseCategoryId,
        IEnumerable<ExpenseTransaction> expenseTransactions,
        ExpenseTransactionCounterNames expenseTransactionCounterNames,
        DateTime dateTime
    )
    {
        ExpenseCategory expenseCategory =
            _databaseContext.ExpenseCategory.FirstOrDefault(expenseCategory =>
                expenseCategory.Id == expenseCategoryId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_CATEGORY
            );

        IEnumerable<ExpenseTransaction> _expenseTransactions =
            expenseTransactions.Where(expenseTransaction =>
                DateOnly.FromDateTime(expenseTransaction.DateTime)
                    >= DateOnly.FromDateTime(expenseCategory.FromDate)
                && DateOnly.FromDateTime(expenseTransaction.DateTime)
                    <= DateOnly.FromDateTime(expenseCategory.ToDate)
            );

        if (dateTime == DateTime.MinValue)
            return new(
                _expenseTransactions.Take(10),
                _expenseTransactions.Sum(item => long.Parse(item.Amount)),
                expenseTransactionCounterNames
            );

        expenseTransactions = expenseTransactions
            .Where(expenseTransaction =>
                expenseTransaction.DateTime >= dateTime
                || DateOnly.FromDateTime(expenseTransaction.DateTime)
                    == DateOnly.FromDateTime(dateTime)
            )
            .OrderByDescending(expenseTransaction =>
                long.Parse(expenseTransaction.Amount)
            );

        return new(
            expenseTransactions.Take(10),
            expenseTransactions.Sum(item => long.Parse(item.Amount)),
            expenseTransactionCounterNames
        );
    }

    public IEnumerable<ExpenseTransactionObject.Statistic> Statistic(
        Guid profileId,
        Guid categoryId
    )
    {
        Pagination<ExpenseTransaction> expenseTransactions = List(
            profileId,
            categoryId,
            new QueryOptions()
        );
        return expenseTransactions.Data.Select(
            expenseTransaction => new ExpenseTransactionObject.Statistic(
                expenseTransaction.Name,
                long.Parse(expenseTransaction.Amount)
            )
        );
    }

    public ExpenseTransaction Update(
        ExpenseTransactionDataTransformer.Update update
    )
    {
        ExpenseTransaction expenseTransaction =
            _expenseTransactionRepository
                .Include(expenseTransaction => expenseTransaction.Expense)
                .FirstOrDefault(expenseTransaction =>
                    expenseTransaction.Id == update.Id
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_TRANSACTION
            );

        ExpenseTransaction merge = Mapper.Merge(
            expenseTransaction,
            update
        );

        _expenseTransactionRepository.Update(merge);
        Refresh(expenseTransaction.Expense.ProfileId);
        return merge;
    }

    public IEnumerable<Dashboard.Value> Expenditure(
        Guid profileId,
        Guid categoryId
    )
    {
        IEnumerable<Dashboard.Value> values = _databaseContext
            .ExpenseTransaction.Where(expenseTransaction =>
                expenseTransaction.ExpenseId == categoryId
                && expenseTransaction.Expense.ProfileId == profileId
            )
            .OrderByDescending(expenseTransaction =>
                expenseTransaction.DateTime
            )
            .GroupBy(expenseTransaction => expenseTransaction.DateTime.Date)
            .ToList()
            .Select(expenseTransactionGroup => new Dashboard.Value(
                expenseTransactionGroup.Key.ToString(),
                expenseTransactionGroup.Key,
                expenseTransactionGroup.Sum(expenseTransaction =>
                    long.Parse(expenseTransaction.Amount)
                )
            ));

        double maxValue = values.Any()
            ? values.Max(value => value.quantity)
            : 0;

        foreach (var value in values)
            value.quantity = Math.Round(value.quantity / maxValue * 100);

        return values;
    }

    private void Refresh(Guid profileId)
    {
        _connectionHubService.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.EXPENSE_TRANSACTION),
            default
        );
    }

    private void ResetCache(Guid profileId)
    {
        List<string> nameofCaches =
        [
            nameof(ExpenseTransaction) + profileId,
            nameof(Expense) + profileId,
        ];
        nameofCaches.ForEach(_cacheService.Reset);
    }
}
