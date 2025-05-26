namespace ReferenceController;

[ApiController]
[Route(RouteMap.SALE_PROGRAMS)]
[Tags(TagName.SALE_PROGRAMS)]
public class SaleProgramController(
    ISaleProgram saleProgramService,
    IJwt jwtService
) : Controller
{
    private readonly ISaleProgram _saleProgramService = saleProgramService;
    private readonly IJwt _jwtService = jwtService;

    [HttpPost]
    [Authorize]
    public IActionResult Create(
        [FromBody] SaleProgramDataTransformer.Create create
    )
    {
        var saleProgram = _saleProgramService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(saleProgram);
    }

    [HttpPut]
    [Authorize]
    public IActionResult Update(
        [FromBody] SaleProgramDataTransformer.Update update
    )
    {
        var saleProgram = _saleProgramService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(saleProgram);
    }

    [HttpPatch(RouteMap.STATUS + "/{saleProgramId}")]
    [Authorize]
    public IActionResult UpdateStatus(
        [FromBody] SaleProgramDataTransformer.UpdateStatus updateStatus,
        [FromRoute] Guid saleProgramId
    )
    {
        var saleProgram = _saleProgramService.UpdateStatus(
            _jwtService.Information().ProfileId,
            saleProgramId,
            updateStatus
        );
        return Ok(saleProgram);
    }

    [HttpDelete("{saleProgramId}")]
    [Authorize]
    public IActionResult List([FromRoute] Guid saleProgramId)
    {
        var message = _saleProgramService.Remove(
            _jwtService.Information().ProfileId,
            saleProgramId
        );
        return Ok(message);
    }

    [HttpGet]
    [Authorize]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var salePrograms = _saleProgramService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(salePrograms);
    }

    [HttpGet(RouteMap.COUNTER)]
    [Authorize]
    public IActionResult Counter()
    {
        var counter = _saleProgramService.Counter(
            _jwtService.Information().ProfileId
        );
        return Ok(counter);
    }

    [HttpGet(RouteMap.STATUS)]
    [Authorize]
    public IActionResult Status()
    {
        var status = _saleProgramService.Status();
        return Ok(status);
    }

    [HttpGet(RouteMap.INVOICES + "/{saleProgramId}")]
    [Authorize]
    public IActionResult Invoices(
        [FromRoute] Guid saleProgramId,
        [FromQuery] QueryOptions queryOptions
    )
    {
        var invoices = _saleProgramService.Invoices(
            _jwtService.Information().ProfileId,
            saleProgramId,
            queryOptions
        );
        return Ok(invoices);
    }

    [HttpGet(RouteMap.REPORTS + "/{saleProgramId}")]
    [Authorize]
    public IActionResult Report([FromRoute] Guid saleProgramId)
    {
        var report = _saleProgramService.Report(
            _jwtService.Information().ProfileId,
            saleProgramId
        );
        return Ok(report);
    }

    [HttpGet(RouteMap.REVENUE + "/{saleProgramId}")]
    [Authorize]
    public IActionResult Revenue([FromRoute] Guid saleProgramId)
    {
        var revenue = _saleProgramService.Revenue(
            _jwtService.Information().ProfileId,
            saleProgramId
        );
        return Ok(revenue);
    }

    [HttpGet("{saleProgramId}")]
    [Authorize]
    public IActionResult Information([FromRoute] Guid saleProgramId)
    {
        var saleProgram = _saleProgramService.Information(
            _jwtService.Information().ProfileId,
            saleProgramId
        );
        return Ok(saleProgram);
    }
}
