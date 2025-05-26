namespace ReferenceController;

[ApiController]
[Route(RouteMap.GEMINI)]
[Tags(TagName.GEMINI)]
public class GeminiController(IGemini GeminiService) : Controller
{
    private readonly IGemini _GeminiService = GeminiService;

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Chat([FromQuery] string input)
    {
        var result = await _GeminiService.Chat(input);
        return Ok(result);
    }
}
