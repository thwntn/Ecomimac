namespace ReferenceController;

[ApiController]
[Route(RouteMap.TAGS)]
[Tags(TagName.TAGS)]
public class TagController(ITag tagService, IJwt jwtService) : Controller
{
    private readonly ITag _tagService = tagService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] TagDataTransformerObject.Create create
    )
    {
        var tag = _tagService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(tag);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] TagDataTransformerObject.Update update
    )
    {
        var tag = _tagService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(tag);
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var tags = _tagService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(tags);
    }

    [Authorize]
    [HttpGet("{tagId}")]
    public IActionResult Information([FromRoute] Guid tagId)
    {
        var tag = _tagService.Information(
            _jwtService.Information().ProfileId,
            tagId
        );
        return Ok(tag);
    }
}
