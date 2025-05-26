namespace ReferenceController;

[ApiController]
[Route(RouteMap.KANBAN_CATEGORIES)]
[Tags(TagName.KANBAN_CATEGORIES)]
public class KabanCategoryController(
    IJwt jwtService,
    IKabanCategory kabanCategoryService
) : Controller
{
    private readonly IJwt _jwtService = jwtService;
    private readonly IKabanCategory _kabanCategoryService =
        kabanCategoryService;

    [HttpGet]
    [Authorize]
    public IActionResult List()
    {
        var list = _kabanCategoryService.List(
            _jwtService.Information().ProfileId
        );
        return Ok(list);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create(
        [FromBody] KabanCategoryDataTransformer.Create create
    )
    {
        var kabanCategory = _kabanCategoryService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(kabanCategory);
    }

    [HttpPatch]
    [Authorize]
    public IActionResult Update(
        [FromBody] KabanCategoryDataTransformer.Update update
    )
    {
        var kabanCategory = _kabanCategoryService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(kabanCategory);
    }

    [HttpDelete("{kabanCategoryId}")]
    [Authorize]
    public IActionResult Remove([FromRoute] Guid kabanCategoryId)
    {
        var message = _kabanCategoryService.Remove(
            _jwtService.Information().ProfileId,
            kabanCategoryId
        );
        return Ok(message);
    }
}
