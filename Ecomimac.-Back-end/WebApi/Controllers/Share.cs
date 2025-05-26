namespace ReferenceController;

[ApiController]
[Route(RouteMap.SHARES)]
[Tags(TagName.SHARES)]
public class ShareController(IShare shareService) : Controller
{
    private readonly IShare _shareService = shareService;

    [HttpPost("{accountId}")]
    public async Task<IActionResult> Upload(
        [FromForm] IFormCollection form,
        [FromRoute] int accountId
    )
    {
        await _shareService.Transfer(form.Files[0], accountId);
        return Ok(string.Empty);
    }
}
