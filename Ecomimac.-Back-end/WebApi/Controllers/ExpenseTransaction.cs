namespace ReferenceController;

[ApiController]
[Route(RouteMap.EXPENSE_TRANSACTIONS)]
[Tags(TagName.EXPENSE_TRANSACTIONS)]
public class ExpenseTransactionController(
    IExpenseTransaction expenseCategoryTransactionService,
    IJwt jwtService
) : Controller
{
    private readonly IExpenseTransaction _expenseCategoryTransactionService =
        expenseCategoryTransactionService;
    private readonly IJwt _jwtService = jwtService;

    [HttpPut]
    public IActionResult Update(
        [FromBody] ExpenseTransactionDataTransformer.Update update
    )
    {
        var expenseCategoryTransaction =
            _expenseCategoryTransactionService.Update(update);
        return Ok(expenseCategoryTransaction);
    }

    [HttpGet("{categoryId}")]
    public IActionResult List(
        [FromRoute] Guid categoryId,
        [FromQuery] QueryOptions queryOptions
    )
    {
        var expenseCategoryTransactions =
            _expenseCategoryTransactionService.List(
                _jwtService.Information().ProfileId,
                categoryId,
                queryOptions
            );
        return Ok(expenseCategoryTransactions);
    }

    [HttpGet(RouteMap.STATISTIC + "/{categoryId}")]
    public IActionResult Statistic([FromRoute] Guid categoryId)
    {
        var statistics = _expenseCategoryTransactionService.Statistic(
            _jwtService.Information().ProfileId,
            categoryId
        );
        return Ok(statistics);
    }

    [HttpPost("{expenseId}")]
    public IActionResult Create(
        [FromRoute] Guid expenseId,
        [FromBody] ExpenseTransactionDataTransformer.Create create
    )
    {
        var expenseCategoryTransaction =
            _expenseCategoryTransactionService.Create(
                _jwtService.Information().ProfileId,
                expenseId,
                create
            );
        return Ok(expenseCategoryTransaction);
    }

    [HttpDelete]
    public IActionResult Remove(
        [FromBody] ExpenseTransactionDataTransformer.Remove remove
    )
    {
        var message = _expenseCategoryTransactionService.Remove(
            _jwtService.Information().ProfileId,
            remove.Ids
        );
        return Ok(message);
    }

    [HttpGet(RouteMap.WITH_CATEGORIES + "/{expenseId}")]
    public IActionResult WithCategory([FromRoute] Guid expenseId)
    {
        var expenseCategoryTransactions =
            _expenseCategoryTransactionService.WithCategory(expenseId);
        return Ok(expenseCategoryTransactions);
    }

    [HttpGet(RouteMap.COUNTER + "/{expenseCategoryId}")]
    public IActionResult Counter([FromRoute] Guid expenseCategoryId)
    {
        var counter = _expenseCategoryTransactionService.Counter(
            _jwtService.Information().ProfileId,
            expenseCategoryId
        );
        return Ok(counter);
    }

    [HttpGet(RouteMap.EXPENDITURE + "/{categoryId}")]
    public IActionResult Expenditure([FromRoute] Guid categoryId)
    {
        var expenditure = _expenseCategoryTransactionService.Expenditure(
            _jwtService.Information().ProfileId,
            categoryId
        );
        return Ok(expenditure);
    }
}
