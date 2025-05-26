namespace ReferenceController;

[ApiController]
[Route(RouteMap.EXTRA)]
[Tags(TagName.EXTRA)]
public class ExtraController(IExtra extraService, IJwt jwtService) : Controller
{
    private readonly IExtra _extraService = extraService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] ExtraDataTransformer.Create create)
    {
        var account = _extraService.Create(create);
        return Ok(account);
    }

    [HttpPost(RouteMap.AUTHORIZATION)]
    public IActionResult Signin([FromBody] ExtraDataTransformer.Signin signin)
    {
        var account = _extraService.Signin(signin);
        return Ok(account);
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var list = _extraService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(list);
    }

    [Authorize]
    [HttpPost(RouteMap.SWITCH)]
    public IActionResult Switch(
        [FromBody] ExtraDataTransformer.Switch switchAccount
    )
    {
        var account = _extraService.Switch(
            _jwtService.Account().Id,
            switchAccount
        );
        return Ok(account);
    }

    [Authorize]
    [HttpPost(RouteMap.STATUS_LOCK_OPEN)]
    public IActionResult LockOrOpen(
        [FromBody] ExtraDataTransformer.Lock lockAccount
    )
    {
        var account = _extraService.LockOrOpen(
            _jwtService.Account().Id,
            lockAccount
        );
        return Ok(account);
    }
}
