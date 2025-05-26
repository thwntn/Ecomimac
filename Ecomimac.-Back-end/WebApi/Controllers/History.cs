namespace ReferenceController;

[ApiController]
[Route(RouteMap.HISTORY)]
[Tags(TagName.HISTORY)]
public class HistoryController(IJwt jwt, IStatusHistory statusHistory)
    : Controller
{
    private readonly IJwt _jwt = jwt;
    private readonly IStatusHistory _statusHistory = statusHistory;

    [Authorize]
    [HttpGet(RouteMap.STATUS)]
    public IActionResult Status()
    {
        IEnumerable<HistoryObject.Status> status = _statusHistory.Execute();
        return Ok(status);
    }
}
