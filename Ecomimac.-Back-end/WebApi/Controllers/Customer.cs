namespace ReferenceController;

[ApiController]
[Route(RouteMap.CUSTOMERS)]
[Tags(TagName.CUSTOMERS)]
public class CustomerController(IJwt jwtService, ICustomer customerService)
    : Controller
{
    private readonly IJwt _jwtService = jwtService;
    private readonly ICustomer _customerService = customerService;

    [Authorize]
    [HttpGet(RouteMap.RECENT_INVOICES + "/{customerId}")]
    public IActionResult RecentInvoice(
        [FromRoute] Guid customerId,
        [FromQuery] QueryOptions queryOptions
    )
    {
        var invoices = _customerService.RecentInvoice(
            _jwtService.Information().ProfileId,
            customerId,
            queryOptions
        );
        return Ok(invoices);
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var customers = _customerService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(customers);
    }

    [Authorize]
    [HttpGet("{productId}")]
    public IActionResult List([FromRoute] Guid productId)
    {
        var customer = _customerService.Info(productId);
        return Ok(customer);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] CustomerDataTransformer.Create create
    )
    {
        var customer = _customerService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(customer);
    }

    [Authorize]
    [HttpPost(RouteMap.ADD_IMAGE + "/{customerId}")]
    public async Task<IActionResult> AddImage(
        [FromRoute] Guid customerId,
        [FromForm] IFormCollection form
    )
    {
        var customer = await _customerService.AddImage(
            _jwtService.Information().ProfileId,
            customerId,
            form.Files[0]
        );
        return Ok(customer);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromRoute] Guid customerId,
        [FromBody] CustomerDataTransformer.Update update
    )
    {
        var customer = _customerService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(customer);
    }

    [Authorize]
    [HttpDelete("{customerId}")]
    public IActionResult Remove([FromRoute] Guid customerId)
    {
        string message = _customerService.Remove(
            _jwtService.Information().ProfileId,
            customerId
        );
        return Ok(message);
    }

    [Authorize]
    [HttpGet(RouteMap.POTENTIAL)]
    public IActionResult Potential()
    {
        var customer = _customerService.Potential(
            _jwtService.Information().ProfileId
        );
        return Ok(customer);
    }
}
