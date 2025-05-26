namespace ReferenceController;

[ApiController]
[Route(RouteMap.TIME)]
[Tags(TagName.TIME)]
public class TimeController : Controller
{
    [HttpGet(RouteMap.TIME_ZONE_INFO)]
    public IActionResult TimeZoneInfos()
    {
        var timeZoneInfos = Timebase.ListTimeZoneId();
        return Ok(timeZoneInfos);
    }

    [HttpGet(RouteMap.NOW)]
    public IActionResult Now()
    {
        var timeZoneInfos = Timebase.Now();
        return Ok(timeZoneInfos);
    }
}
