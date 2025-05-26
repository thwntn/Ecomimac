namespace ReferenceController;

[ApiController]
[Route(RouteMap.PLANS)]
[Tags(TagName.PLANS)]
public class PlanController(IPlan planService) : Controller
{
    private readonly IPlan _planService = planService;

    [HttpGet("{weekOfYear}")]
    public IActionResult List([FromRoute] string weekOfYear)
    {
        var plans = _planService.List(weekOfYear);
        return Ok(plans);
    }

    [HttpPost]
    public IActionResult Create([FromBody] PlanDataTransformer.Create create)
    {
        var plan = _planService.Create(create);
        return Ok(plan);
    }

    [HttpDelete("{planId}")]
    public IActionResult Remove([FromRoute] Guid planId)
    {
        var message = _planService.Remove(planId);
        return Ok(message);
    }
}
