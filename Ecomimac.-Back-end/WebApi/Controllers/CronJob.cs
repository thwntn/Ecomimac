namespace ReferenceController;

[ApiController]
[Route(RouteMap.HISTORY)]
public class CronJobController(ISyncFromCacheHistory syncFromCacheHistory)
    : Controller
{
    private readonly ISyncFromCacheHistory _syncFromCacheHistory =
        syncFromCacheHistory;

    [HttpGet(RouteMap.SYNC_FROM_CACHE_HISTORY)]
    public IActionResult SyncFromCacheHistory()
    {
        var status = _syncFromCacheHistory.Execute();
        return Ok(status);
    }
}
