namespace ReferenceController;

[Controller]
[Route(RouteMap.TELEGRAM)]
[Tags(TagName.TELEGRAM)]
public class TelegramController(ITelegram telegramService) : Controller
{
    private readonly ITelegram _telegramService = telegramService;

    [HttpPost(RouteMap.SETUP)]
    public IActionResult Setup([FromBody] TelegramDataTransformer.Setup setup)
    {
        var setting = _telegramService.Setup(setup);
        return Ok(setting);
    }

    [HttpGet(RouteMap.SEND_MESSAGE)]
    public async Task<IActionResult> SendMessage()
    {
        var message = await _telegramService.SendMessage(string.Empty);
        return Ok(message);
    }
}
