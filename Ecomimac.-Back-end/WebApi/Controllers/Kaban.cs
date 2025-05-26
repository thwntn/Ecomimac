namespace ReferenceController;

[ApiController]
[Route(RouteMap.KANBAN)]
[Tags(TagName.KANBAN)]
public class KabanController(IJwt jwtService, IKaban kabanService) : Controller
{
    private readonly IJwt _jwtService = jwtService;
    private readonly IKaban _kabanService = kabanService;

    [HttpGet]
    [Authorize]
    public IActionResult List()
    {
        var list = _kabanService.List(_jwtService.Information().ProfileId);
        return Ok(list);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create(
        [FromBody] KabanDataTransformer.Create create,
        [FromRoute] Guid kabanCategoryId
    )
    {
        var kaban = _kabanService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(kaban);
    }

    [HttpPatch]
    [Authorize]
    public IActionResult Update([FromBody] KabanDataTransformer.Update update)
    {
        var kaban = _kabanService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(kaban);
    }

    [HttpPatch(RouteMap.MOVE)]
    [Authorize]
    public IActionResult Move([FromBody] KabanDataTransformer.Move move)
    {
        var kaban = _kabanService.Move(
            _jwtService.Information().ProfileId,
            move
        );
        return Ok(kaban);
    }

    [HttpPost(RouteMap.IMAGE + "/{kabanId}")]
    [Authorize]
    public async Task<IActionResult> Image(
        [FromForm] IFormCollection form,
        [FromRoute] Guid kabanId
    )
    {
        var kaban = await _kabanService.Image(
            _jwtService.Information().ProfileId,
            kabanId,
            form.Files[0]
        );
        return Ok(kaban);
    }

    [HttpDelete("{kabanId}")]
    [Authorize]
    public IActionResult Remove([FromRoute] Guid kabanId)
    {
        var message = _kabanService.Remove(
            _jwtService.Information().ProfileId,
            kabanId
        );
        return Ok(message);
    }
}
