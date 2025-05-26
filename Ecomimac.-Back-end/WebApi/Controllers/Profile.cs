namespace ReferenceController;

[ApiController]
[Route(RouteMap.PROFILES)]
[Tags(TagName.PROFILES)]
public class ProfileController(IProfile profileService) : Controller
{
    private readonly IProfile _profileService = profileService;

    [Authorize]
    [HttpGet]
    public IActionResult Get()
    {
        var info = _profileService.Info();
        return Ok(info);
    }

    [Authorize]
    [HttpPatch]
    public IActionResult Update([FromBody] ProfileDataTransformer.Update update)
    {
        var info = _profileService.Update(update);
        return Ok(info);
    }

    [Authorize]
    [HttpPost(RouteMap.UPDATE_AVATAR)]
    public async Task<IActionResult> ChangeAvatar(
        [FromForm] IFormCollection form
    )
    {
        var user = await _profileService.ChangeAvatar(form.Files[0]);
        return Ok(user);
    }

    [Authorize]
    [HttpPost(RouteMap.UPDATE_COVER_PICTURE)]
    public async Task<IActionResult> ChangeCoverPicture(
        [FromForm] IFormCollection form
    )
    {
        var user = await _profileService.ChangeCoverPicture(form.Files[0]);
        return Ok(user);
    }
}
