namespace ReferenceController;

[Route(RouteMap.CASH_DESCRIPTIONS)]
[Tags(TagName.CASH_DESCRIPTIONS)]
[ApiController]
public class CashDescriptionController(
    ICashDescription cashDescriptionService,
    IJwt jwtService
) : Controller
{
    private readonly ICashDescription _cashDescriptionService =
        cashDescriptionService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List()
    {
        Information information = _jwtService.Information();
        var cashDescriptions = _cashDescriptionService.List(
            information.ProfileId
        );
        return Ok(cashDescriptions);
    }

    [Authorize]
    [HttpGet(RouteMap.RECENT)]
    public IActionResult Recent()
    {
        Information information = _jwtService.Information();
        var cashDescription = _cashDescriptionService.Recent(
            information.ProfileId
        );
        return Ok(cashDescription);
    }

    [Authorize]
    [HttpPost("{cashId}")]
    public IActionResult Create(
        [FromRoute] Guid cashId,
        [FromBody] CashDescriptionDataTransformer.Create create
    )
    {
        var cashDescription = _cashDescriptionService.Create(cashId, create);
        return Ok(cashDescription);
    }
}
