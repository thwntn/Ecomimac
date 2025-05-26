namespace ReferenceController;

[ApiController]
[Route(RouteMap.FAKERS)]
[Tags(TagName.FAKERS)]
public class FakerController(IFaker fakerService, IJwt jwtService) : Controller
{
    private readonly IFaker _fakerService = fakerService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet(RouteMap.EXPENSES)]
    public IActionResult Expense()
    {
        Information information = _jwtService.Information();
        var expense = _fakerService.Expense(information.ProfileId);
        return Ok(expense);
    }

    [Authorize]
    [HttpGet(RouteMap.CUSTOMERS)]
    public IActionResult Customer()
    {
        Information information = _jwtService.Information();
        var customers = _fakerService.Customer(information.ProfileId);
        return Ok(customers);
    }

    [Authorize]
    [HttpGet(RouteMap.PRODUCTS)]
    public IActionResult Product()
    {
        Information information = _jwtService.Information();
        var products = _fakerService.Product(information.ProfileId);
        return Ok(products);
    }

    [Authorize]
    [HttpGet(RouteMap.DISCOUNTS)]
    public IActionResult Discount()
    {
        Information information = _jwtService.Information();
        var discounts = _fakerService.Discount(information.ProfileId);
        return Ok(discounts);
    }

    [Authorize]
    [HttpGet(RouteMap.DISCOUNTS + "/{categoryId}")]
    public IActionResult ExpenseTransaction(Guid categoryId)
    {
        var expenseCategoryTransactions = _fakerService.ExpenseTransaction(
            categoryId
        );
        return Ok(expenseCategoryTransactions);
    }
}
