namespace ReferenceController;

[ApiController]
[Route(RouteMap.EXPENSES)]
[Tags(TagName.EXPENSES)]
public class ExpenseController(IExpense expense, IJwt jwtService) : Controller
{
    private readonly IExpense _expense = expense;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var list = _expense.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(list);
    }

    [Authorize]
    [HttpGet(RouteMap.FILTER)]
    public IActionResult Filter()
    {
        var list = _expense.Filter(_jwtService.Information().ProfileId);
        return Ok(list);
    }

    [Authorize]
    [HttpGet(RouteMap.BANNER + "/{expenseCategoryId}")]
    public IActionResult Banner([FromRoute] Guid expenseCategoryId)
    {
        var banner = _expense.Banner(
            _jwtService.Information().ProfileId,
            expenseCategoryId
        );
        return Ok(banner);
    }

    [Authorize]
    [HttpGet("{categoryId}")]
    public IActionResult Infomation([FromRoute] Guid categoryId)
    {
        var category = _expense.Information(
            _jwtService.Information().ProfileId,
            categoryId
        );
        return Ok(category);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] ExpenseDataTransformer.Create create)
    {
        var expense = _expense.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(expense);
    }

    [Authorize]
    [HttpPatch]
    public IActionResult Update([FromBody] ExpenseDataTransformer.Update update)
    {
        var expense = _expense.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(expense);
    }

    [Authorize]
    [HttpDelete]
    public IActionResult Remove([FromBody] ExpenseDataTransformer.Remove remove)
    {
        var message = _expense.Remove(
            _jwtService.Information().ProfileId,
            remove.Ids
        );
        return Ok(message);
    }
}
