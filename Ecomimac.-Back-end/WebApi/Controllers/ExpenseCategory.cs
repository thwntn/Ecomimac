namespace ReferenceController;

[ApiController]
[Route(RouteMap.EXPENSE_CATEGORIES)]
[Tags(TagName.EXPENSE_CATEGORIES)]
public class ExpenseCategoryController(
    IExpenseCategory expenseCategoryService,
    IJwt jwtService
) : Controller
{
    private readonly IExpenseCategory _expenseCategoryService =
        expenseCategoryService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] ExpenseCategoryDataTransformer.Create create
    )
    {
        var expenseCategory = _expenseCategoryService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(expenseCategory);
    }

    [Authorize]
    [HttpPost(RouteMap.CLONE)]
    public IActionResult Clone(
        [FromBody] ExpenseCategoryDataTransformer.Clone clone
    )
    {
        var expenseCategory = _expenseCategoryService.Clone(
            _jwtService.Information().ProfileId,
            clone.FromId,
            clone.ToId
        );
        return Ok(expenseCategory);
    }

    [Authorize]
    [HttpPatch(RouteMap.TAGS + "/{expenseCategoryId}")]
    public IActionResult UpdateTag(
        [FromRoute] Guid expenseCategoryId,
        [FromBody] ExpenseCategoryDataTransformer.UpdateTag updateTag
    )
    {
        var expenseCategoryTags = _expenseCategoryService.UpdateTag(
            _jwtService.Information().ProfileId,
            expenseCategoryId,
            updateTag
        );
        return Ok(expenseCategoryTags);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] ExpenseCategoryDataTransformer.Update create
    )
    {
        var expenseCategory = _expenseCategoryService.Update(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(expenseCategory);
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var expenseCategories = _expenseCategoryService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(expenseCategories);
    }

    [Authorize]
    [HttpGet(RouteMap.COUNTER)]
    public IActionResult Counter()
    {
        var counter = _expenseCategoryService.Counter(
            _jwtService.Information().ProfileId
        );
        return Ok(counter);
    }

    [Authorize]
    [HttpGet(RouteMap.EXPENSES + "/{expenseCategoryId}")]
    public IActionResult Expense(
        [FromRoute] Guid expenseCategoryId,
        [FromQuery] QueryOptions queryOptions
    )
    {
        var expense = _expenseCategoryService.Expense(
            _jwtService.Information().ProfileId,
            expenseCategoryId,
            queryOptions
        );
        return Ok(expense);
    }

    [Authorize]
    [HttpGet("{expenseCategoryId}")]
    public IActionResult Information([FromRoute] Guid expenseCategoryId)
    {
        var expenseCategory = _expenseCategoryService.Information(
            _jwtService.Information().ProfileId,
            expenseCategoryId
        );
        return Ok(expenseCategory);
    }

    [Authorize]
    [HttpDelete("{expenseCategoryId}")]
    public IActionResult Remove([FromRoute] Guid expenseCategoryId)
    {
        var message = _expenseCategoryService.Remove(
            _jwtService.Information().ProfileId,
            expenseCategoryId
        );
        return Ok(message);
    }
}
