namespace ReferenceController;

[ApiController]
[Route(RouteMap.SETTINGS)]
[Tags(TagName.SETTINGS)]
public class SettingController(ISetting settingService, IJwt jwtService)
    : Controller
{
    private readonly ISetting _settingService = settingService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List()
    {
        var setting = _settingService.Get(_jwtService.Information().ProfileId);
        return Ok(setting);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Update([FromBody] SettingDataTransformer.Update update)
    {
        var setting = _settingService.UpSert(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(setting);
    }

    [Authorize]
    [HttpDelete("{settingId}")]
    public IActionResult Remove([FromRoute] Guid settingId)
    {
        var message = _settingService.Remove(
            _jwtService.Information().ProfileId,
            settingId
        );
        return Ok(message);
    }
}
