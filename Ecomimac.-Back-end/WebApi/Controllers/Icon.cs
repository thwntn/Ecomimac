namespace ReferenceController;

[ApiController]
[Route(RouteMap.ICONS)]
[Tags(TagName.ICONS)]
public class IconController(IIcon iconService) : Controller
{
    private readonly IIcon _iconService = iconService;

    [Authorize]
    [HttpGet]
    public IActionResult List()
    {
        var icons = _iconService.List();
        return Ok(icons);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] IconDataTransformer.Create create)
    {
        var icon = _iconService.Create(create);
        return Ok(icon);
    }

    [Authorize]
    [HttpDelete("{iconId}")]
    public IActionResult Remove([FromRoute] Guid iconId)
    {
        var message = _iconService.Remove(iconId);
        return Ok(message);
    }
}
