namespace ReferenceController;

[ApiController]
[Route(RouteMap.ACTIVITIES)]
[Tags(TagName.ACTIVITIES)]
public class ActivityController(IActivity activityService, IJwt jwtService)
    : Controller
{
    private readonly IActivity _activityService = activityService;
    private readonly IJwt _jwtService = jwtService;

    [HttpGet]
    [Authorize]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var activities = _activityService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(
            Mapper.Map<PaginationResponse<ActivityObject.ActivityResponse>>(
                activities
            )
        );
    }
}
