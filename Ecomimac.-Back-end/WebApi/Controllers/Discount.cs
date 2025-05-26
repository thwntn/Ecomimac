namespace ReferenceController;

[ApiController]
[Route(RouteMap.DISCOUNTS)]
[Tags(TagName.DISCOUNTS)]
public class DiscountController(IDiscount discountService, IJwt jwtService)
    : Controller
{
    private readonly IDiscount _discountService = discountService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List(
        [FromQuery] DiscountDataTransformer.DiscountQuery discountQuery
    )
    {
        var discounts = _discountService.List(
            _jwtService.Information().ProfileId,
            discountQuery
        );
        return Ok(discounts);
    }

    [Authorize]
    [HttpGet("{discountId}")]
    public IActionResult Info([FromRoute] Guid discountId)
    {
        var discount = _discountService.Info(discountId);
        return Ok(discount);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] DiscountDataTransformer.Create create
    )
    {
        var discount = _discountService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(discount);
    }

    [Authorize]
    [HttpPatch(RouteMap.CHANGE_STATUS + "/{discountId}")]
    public IActionResult ChangeStatus(
        [FromRoute] Guid discountId,
        [FromBody] DiscountDataTransformer.ChangeStatus changeStatus
    )
    {
        var discount = _discountService.ChangeStatus(
            _jwtService.Information().ProfileId,
            discountId,
            changeStatus.Status
        );
        return Ok(discount);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] DiscountDataTransformer.Update update
    )
    {
        var discount = _discountService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(discount);
    }

    [Authorize]
    [HttpDelete("{discountId}")]
    public IActionResult Remove([FromRoute] Guid discountId)
    {
        var message = _discountService.Remove(
            _jwtService.Information().ProfileId,
            discountId
        );
        return Ok(message);
    }

    [Authorize]
    [HttpGet(RouteMap.COUNTER)]
    public IActionResult Counter()
    {
        var message = _discountService.Counter(
            _jwtService.Information().ProfileId
        );
        return Ok(message);
    }

    [Authorize]
    [HttpGet(RouteMap.INVOICES + "/{discountId}")]
    public IActionResult Invoice(
        [FromQuery] QueryOptions queryOptions,
        [FromRoute] Guid discountId
    )
    {
        var invoiceDiscounts = _discountService.Invoice(
            _jwtService.Information().ProfileId,
            discountId,
            queryOptions
        );
        return Ok(invoiceDiscounts);
    }

    [Authorize]
    [HttpGet(RouteMap.RECENT)]
    public IActionResult Recent()
    {
        var recent = _discountService.Recent(
            _jwtService.Information().ProfileId
        );
        return Ok(recent);
    }

    [Authorize]
    [HttpGet(RouteMap.CHART + "/{discountId}")]
    public IActionResult Chart([FromRoute] Guid discountId)
    {
        var chart = _discountService.Chart(
            _jwtService.Information().ProfileId,
            discountId
        );
        return Ok(chart);
    }
}
