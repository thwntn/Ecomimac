namespace ReferenceController;

[ApiController]
[Route(RouteMap.FUNDS)]
[Tags(TagName.FUNDS)]
public class FundController(IFund fundService) : Controller
{
    private readonly IFund _fundService = fundService;

    [Authorize]
    [HttpGet]
    public IActionResult Get()
    {
        var list = _fundService.List();
        return Ok(list);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] FundDataTransformer.Create create)
    {
        var fund = _fundService.Create(create);
        return Ok(fund);
    }

    [Authorize]
    [HttpGet("{fundId}")]
    public IActionResult Create([FromRoute] Guid fundId)
    {
        var fund = _fundService.Info(fundId);
        return Ok(fund);
    }

    [Authorize]
    [HttpDelete("{fundId}")]
    public IActionResult Remove([FromRoute] Guid fundId)
    {
        var message = _fundService.Remove(fundId);
        return Ok(message);
    }
}
