namespace ReferenceController;

[ApiController]
[Route(RouteMap.MEDIA)]
[Tags(TagName.MEDIA)]
public class MediaController() : Controller
{
    [HttpGet(RouteMap.FILE + "/{fileName}")]
    public IActionResult File([FromRoute] string fileName)
    {
        FileStream file = Reader.ReadFile(fileName);

        if (file is null)
            return File(
                Encoding.UTF8.GetBytes(string.Empty),
                Constant.MEDIA_TYPE
            );

        return File(file, Constant.MEDIA_TYPE);
    }

    [HttpGet(RouteMap.STATIC + "/{fileName}")]
    public IActionResult Access([FromRoute] string fileName)
    {
        FileStream file = Reader.ReadFile(
            fileName,
            Environment.GetEnvironmentVariable(nameof(EnvironmentNames.Static))
        );

        if (file is null)
            return File(
                Encoding.UTF8.GetBytes(string.Empty),
                Constant.MEDIA_TYPE
            );

        return File(file, Constant.MEDIA_TYPE);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromForm] IFormCollection form,
        string name
    )
    {
        ReaderObject.Blob blob = await Reader.Save(form.Files[0], string.Empty);
        return Ok(blob);
    }
}
