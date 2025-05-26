namespace ReferenceController;

[ApiController]
[Route(RouteMap.HEALTHS)]
[Tags(TagName.HEALTHS)]
public class HealthController(IProfile userService) : Controller
{
    private readonly IProfile _accountService = userService;

    [HttpGet]
    public IActionResult Ping()
    {
        int Pong;
        return Ok(nameof(Pong));
    }

    [HttpGet(RouteMap.ACCOUNT)]
    public IActionResult List()
    {
        var info = _accountService.List();
        return Ok(info);
    }
}
