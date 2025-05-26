namespace ReferenceController;

[ApiController]
[Route(RouteMap.ZALO_CREDENTIAL)]
[Tags(TagName.ZALO_CREDENTIAL)]
public class ZaloCredentialController(
    IZaloCredential zaloService,
    IJwt jwtService
) : Controller
{
    private readonly IZaloCredential _zaloService = zaloService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List()
    {
        var zalo = _zaloService.List(_jwtService.Information().ProfileId);

        return Ok(zalo);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] ZaloCredentialDataTransformerObject.Create create
    )
    {
        var zalo = _zaloService.Create(
            _jwtService.Information().ProfileId,
            create
        );

        return Ok(zalo);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] ZaloCredentialDataTransformerObject.Update update
    )
    {
        var zalo = _zaloService.Update(
            _jwtService.Information().ProfileId,
            update
        );

        return Ok(zalo);
    }

    [Authorize]
    [HttpDelete("{zaloId}")]
    public IActionResult Remove([FromRoute] Guid zaloId)
    {
        var zalo = _zaloService.Remove(
            _jwtService.Information().ProfileId,
            zaloId
        );

        return Ok(zalo);
    }

    [Authorize]
    [HttpGet("{zaloId}")]
    public IActionResult Information([FromRoute] Guid zaloId)
    {
        var zalo = _zaloService.Information(
            _jwtService.Information().ProfileId,
            zaloId
        );

        return Ok(zalo);
    }
}
