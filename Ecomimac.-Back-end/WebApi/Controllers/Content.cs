using System.Threading.Tasks;

namespace ReferenceController;

[ApiController]
[Route(RouteMap.CONTENT)]
[Tags(TagName.CONTENT)]
public class ContentController(
    IJwt jwt,
    IUpdateContent updateContent,
    ICreateContent createContent,
    IListContent listContent,
    IInformationContent informationContent,
    IZaloNotificationServicePreview zaloNotificationServicePreview
) : Controller
{
    private readonly IJwt _jwt = jwt;
    private readonly ICreateContent _createContent = createContent;
    private readonly IZaloNotificationServicePreview _zaloNotificationServicePreview =
        zaloNotificationServicePreview;
    private readonly IUpdateContent _updateContent = updateContent;
    private readonly IInformationContent _informationContent =
        informationContent;
    private readonly IListContent _listContent = listContent;

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] ContentDataTransformerObject.Create create
    )
    {
        var content = _createContent.Execute(
            _jwt.Information().ProfileId,
            create
        );
        return Ok(content);
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var contents = _listContent.Execute(
            _jwt.Information().ProfileId,
            queryOptions
        );
        return Ok(contents);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] ContentDataTransformerObject.Update update
    )
    {
        var content = _updateContent.Execute(
            _jwt.Information().ProfileId,
            update
        );
        return Ok(content);
    }

    [Authorize]
    [HttpGet(RouteMap.ZALO_NOTIFICATION_SERVICE_PREVIEW)]
    public async Task<IActionResult> ZaloNotificationServicePreview(
        [FromRoute] string templateId
    )
    {
        var html = await _zaloNotificationServicePreview.Execute(templateId);
        return Ok(html);
    }

    [Authorize]
    [HttpGet("{contentId}")]
    public IActionResult Information([FromRoute] Guid contentId)
    {
        var content = _informationContent.Execute(
            _jwt.Information().ProfileId,
            contentId
        );
        return Ok(content);
    }
}
