namespace ReferenceController;

[ApiController]
[Route(RouteMap.CASH)]
[Tags(TagName.CASH)]
public class CashController(ICash cashService, IJwt jwtService) : Controller
{
    private readonly ICash _cashService = cashService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpPost("{fundId}")]
    public IActionResult Create(
        [FromRoute] Guid fundId,
        [FromBody] CashDataTransformer.Create create
    )
    {
        var cash = _cashService.Create(
            _jwtService.Information().ProfileId,
            fundId,
            create
        );
        return Ok(cash);
    }

    [Authorize]
    [HttpDelete("{cashId}")]
    public IActionResult Remove([FromRoute] Guid cashId)
    {
        var message = _cashService.Remove(
            _jwtService.Information().ProfileId,
            cashId
        );
        return Ok(message);
    }
}
