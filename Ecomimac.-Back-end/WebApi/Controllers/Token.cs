namespace ReferenceController;

[ApiController]
[Route(RouteMap.TOKEN)]
[Tags(TagName.TOKEN)]
public class TokenController(IJwt jwtService) : Controller
{
    private readonly IJwt _jwtService = jwtService;

    [HttpGet(RouteMap.GENERATE)]
    public IActionResult Generate()
    {
        string jwt = _jwtService.GenerateToken(new(), new(), new());
        return Ok(jwt);
    }

    [Authorize]
    [HttpGet(RouteMap.READ)]
    public IActionResult Read()
    {
        Information claimJwt = _jwtService.ReadToken(Request);
        return Ok(claimJwt);
    }
}
