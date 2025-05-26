namespace ReferenceController;

[ApiController]
[Route(RouteMap.EMAIL_CREDENTIAL)]
[Tags(TagName.EMAIL_CREDENTIAL)]
public class MailCredentialController(
    IMailCredential mailService,
    IJwt jwtService
) : Controller
{
    private readonly IMailCredential _mailService = mailService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List()
    {
        var email = _mailService.List(_jwtService.Information().ProfileId);

        return Ok(email);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] MailCredentialDataTransformerObject.Create create
    )
    {
        var email = _mailService.Create(
            _jwtService.Information().ProfileId,
            create
        );

        return Ok(email);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] MailCredentialDataTransformerObject.Update update
    )
    {
        var email = _mailService.Update(
            _jwtService.Information().ProfileId,
            update
        );

        return Ok(email);
    }

    [Authorize]
    [HttpDelete("{emailId}")]
    public IActionResult Remove([FromRoute] Guid emailId)
    {
        var email = _mailService.Remove(
            _jwtService.Information().ProfileId,
            emailId
        );

        return Ok(email);
    }

    [Authorize]
    [HttpGet("{emailId}")]
    public IActionResult Information([FromRoute] Guid emailId)
    {
        var email = _mailService.Information(
            _jwtService.Information().ProfileId,
            emailId
        );

        return Ok(email);
    }
}
