namespace ReferenceController;

[ApiController]
[Route(RouteMap.TEMPLATE)]
[Tags(TagName.TEMPLATE)]
public class Template(IGetTemplate getTemplate) : Controller
{
    private readonly IGetTemplate _getTemplate = getTemplate;

    [HttpGet("{fileName}")]
    public IActionResult Get([FromRoute] string fileName)
    {
        var template = _getTemplate.Execute(fileName);
        return File(template, Constant.MEDIA_TYPE);
    }
}
