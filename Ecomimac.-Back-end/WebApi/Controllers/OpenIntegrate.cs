namespace ReferenceController;

[ApiController]
[Route(RouteMap.OPEN_INTEGRATE_SESSION)]
public class OpenIntegrateController(
    IActiveOpenIntegrationSession activeOpenIntegrationSession,
    ICreateBroadcastOpenIntegrateSession createBroadcastOpenIntegrateSession,
    IJwt jwt
) : Controller
{
    private readonly IJwt _jwt = jwt;
    private readonly IActiveOpenIntegrationSession _activeOpenIntegrationSession =
        activeOpenIntegrationSession;

    private readonly ICreateBroadcastOpenIntegrateSession _createBroadcastOpenIntegrateSession =
        createBroadcastOpenIntegrateSession;

    [Authorize]
    [HttpPost(RouteMap.OPEN_INTEGRATE_SESSION_CREATE_BROADCAST)]
    public IActionResult CreateBroadcast(
        OpenIntegrateSessionDataTransformer.CreateBroadcast createBroadcast
    )
    {
        var openIntegrateSession = _createBroadcastOpenIntegrateSession.Execute(
            _jwt.Information().ProfileId,
            createBroadcast.BroadcastId
        );
        return Ok(openIntegrateSession);
    }

    //  Summary:
    //      Active open integrate session & not verify identity
    //
    [HttpGet(RouteMap.OPEN_INTEGRATE_SESSION_ACTIVE)]
    public async Task<IActionResult> Active([FromRoute] string session)
    {
        var openIntegrateSession = await _activeOpenIntegrationSession.Execute(
            session
        );
        return Ok(openIntegrateSession);
    }
}
