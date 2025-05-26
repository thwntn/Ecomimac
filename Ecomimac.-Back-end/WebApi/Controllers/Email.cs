namespace ReferenceController;

[ApiController]
[Route(RouteMap.EMAIL)]
[Tags(TagName.EMAIL)]
public class EmailController(IMail mailService, IJwt jwtService) : Controller
{
    private readonly IMail _mailService = mailService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpPost(RouteMap.SEND_MESSAGE)]
    public IActionResult Send([FromBody] EmailDataTransformerObject.Send send)
    {
        // var status = await _mailService.Send(
        //     _jwtService.Information().ProfileId,
        //     send
        // );
        return Ok(default);
    }
}
