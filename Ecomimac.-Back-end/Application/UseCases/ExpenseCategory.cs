namespace ReferenceService;

public class ExpenseCategoryService(
    DatabaseContext databaseContext,
    IExpenseCategoryRepository expendCategoryRepository,
    IActivity activityService,
    ITagRepository tagRepository
) : IExpenseCategory
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IActivity _activityService = activityService;
    private readonly ITagRepository _tagRepository = tagRepository;
    private readonly IExpenseCategoryRepository _expendCategoryRepository =
        expendCategoryRepository;

    public Pagination<ExpenseCategory> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<ExpenseCategory> expenseCategories = _databaseContext
            .ExpenseCategory.Include(expenseCategory => expenseCategory.Profile)
            .Include(expenseCategory => expenseCategory.ExpenseCategoryTags)
            .ThenInclude(expenseCategoryTag => expenseCategoryTag.Tag)
            .Where(expenseCategory => expenseCategory.ProfileId == profileId)
            .OrderByDescending(expenseCategory => expenseCategory.Created);

        return new(expenseCategories, queryOptions);
    }

    public ExpenseCategoryObject.Counter Counter(Guid profileId)
    {
        IEnumerable<ExpenseCategory> expenseCategories =
            _expendCategoryRepository
                .Include(expendCategory => expendCategory.Expenses)
                .ThenInclude(expense => expense.ExpenseTransactions)
                .Where(expense => expense.ProfileId == profileId);

        IEnumerable<ExpenseTransaction> expenseTransactions = expenseCategories
            .SelectMany(expendCategory => expendCategory.Expenses)
            .SelectMany(expense => expense.ExpenseTransactions);

        return new(
            expenseTransactions
                .Select(expenseTransaction =>
                    long.Parse(expenseTransaction.Amount)
                )
                .Sum(),
            expenseCategories.Count(),
            expenseTransactions.Count()
        );
    }

    public IEnumerable<ExpenseCategoryTag> UpdateTag(
        Guid profileId,
        Guid expenseCategoryId,
        ExpenseCategoryDataTransformer.UpdateTag updateTag
    )
    {
        IEnumerable<ExpenseCategoryTag> expenseCategoryTags =
            _expendCategoryRepository
                .AsDatabaseContext()
                .ExpenseCategoryTag.Where(expenseCategoryTag =>
                    expenseCategoryTag.ExpenseCategoryId == expenseCategoryId
                );
        _expendCategoryRepository
            .AsDatabaseContext()
            .RemoveRange(expenseCategoryTags);

        IEnumerable<ExpenseCategoryTag> update = _tagRepository
            .GetByCondition(tag => updateTag.TagIds.Contains(tag.Id))
            .Select(tag => new ExpenseCategoryTag(expenseCategoryId, tag.Id));

        _expendCategoryRepository
            .AsDatabaseContext()
            .ExpenseCategoryTag.AddRange(update);
        _expendCategoryRepository.AsDatabaseContext().SaveChanges();

        return expenseCategoryTags;
    }

    public ExpenseCategory Create(
        Guid profileId,
        ExpenseCategoryDataTransformer.Create create
    )
    {
        ExpenseCategory expenseCategory = Mapper.Map<ExpenseCategory>(create);
        expenseCategory.ProfileId = profileId;

        _databaseContext.Add(expenseCategory);
        _databaseContext.SaveChanges();

        ExpenseCategoryDataTransformer.UpdateTag update =
            Mapper.Map<ExpenseCategoryDataTransformer.UpdateTag>(create);
        UpdateTag(profileId, expenseCategory.Id, update);
        return expenseCategory;
    }

    public ExpenseCategory Update(
        Guid profileId,
        ExpenseCategoryDataTransformer.Update update
    )
    {
        ExpenseCategory expenseCategory =
            _databaseContext.ExpenseCategory.FirstOrDefault(expenseCategory =>
                expenseCategory.Id == update.Id
                && expenseCategory.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_CATEGORY
            );

        ExpenseCategory merge = Mapper.Merge(expenseCategory, update);
        _databaseContext.Update(merge);
        _databaseContext.SaveChanges();

        ExpenseCategoryDataTransformer.UpdateTag updateTag =
            Mapper.Map<ExpenseCategoryDataTransformer.UpdateTag>(update);
        UpdateTag(profileId, expenseCategory.Id, updateTag);

        return merge;
    }

    public ExpenseCategory Information(Guid profileId, Guid expenseCategoryId)
    {
        ExpenseCategory expenseCategory =
            _databaseContext
                .ExpenseCategory.Include(expenseCategory =>
                    expenseCategory.Expenses
                )
                .Include(expenseCategory => expenseCategory.ExpenseCategoryTags)
                .ThenInclude(expenseCategoryTag => expenseCategoryTag.Tag)
                .FirstOrDefault(expenseCategory =>
                    expenseCategory.Id == expenseCategoryId
                    && expenseCategory.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_CATEGORY
            );

        return expenseCategory;
    }

    public Pagination<Expense> Expense(
        Guid profileId,
        Guid expenseCategoryId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Expense> expenses =
            _databaseContext
                .Expense.Include(expense => expense.ExpenseTransactions)
                .Where(expense =>
                    expense.ExpenseCategoryId == expenseCategoryId
                    && expense.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_CATEGORY
            );

        return new(expenses, queryOptions);
    }

    public IEnumerable<Expense> Clone(Guid profileId, Guid fromId, Guid toId)
    {
        ExpenseCategory expenseCategories =
            _databaseContext
                .ExpenseCategory.Include(expenseCategory =>
                    expenseCategory.Expenses
                )
                .FirstOrDefault(expense =>
                    expense.ProfileId == profileId && expense.Id == fromId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_CATEGORY
            );

        IEnumerable<Expense> newExpenseCategories =
            expenseCategories.Expenses.Select(expense => new Expense(
                expense.Name,
                expense.Description
            )
            {
                DateTime = Timebase.Now(),
                ProfileId = expense.ProfileId,
                ExpenseCategoryId = toId,
                Budget = expense.Budget,
            });
        _databaseContext.AddRange(newExpenseCategories);
        _databaseContext.SaveChanges();

        _activityService.Create(
            profileId,
            [
                new(
                    nameof(ActivityNames.EXPENSE_CLONE),
                    Mapper.Serialize(expenseCategories)
                ),
            ]
        );
        return newExpenseCategories;
    }

    public string Remove(Guid profileId, Guid expenseCategoryId)
    {
        ExpenseCategory expenseCategory =
            _databaseContext.ExpenseCategory.FirstOrDefault(expenseCategory =>
                expenseCategory.Id == expenseCategoryId
                && expenseCategory.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EXPENSE_CATEGORY
            );

        _databaseContext.Remove(expenseCategory);
        _databaseContext.SaveChanges();

        return string.Empty;
    }
}
