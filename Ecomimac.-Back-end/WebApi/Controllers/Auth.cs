namespace ReferenceController;

[ApiController]
[Route(RouteMap.AUTHORIZATION)]
[Tags(TagName.AUTHORIZATION)]
public class AuthController(DatabaseContext db, IAuth authService) : Controller
{
    private readonly DatabaseContext _db = db;
    private readonly IAuth _authService = authService;

    [HttpPost(RouteMap.SIGNUP)]
    public async Task<IActionResult> Signup(AuthDataTransformer.Signup signup)
    {
        var account = await _authService.Signup(signup);
        return Ok(Mapper.Map<AuthObject.SigninWithPasswordResponse>(account));
    }

    [HttpPost(RouteMap.VERIFY_EMAIL)]
    public IActionResult VerifyEmail(
        AuthDataTransformer.VerifyEmail verifyEmail
    )
    {
        var message = _authService.VerifyEmail(verifyEmail);
        return Ok(message);
    }

    [HttpPost(RouteMap.SIGNIN_WITH_PASSWORD)]
    public async Task<IActionResult> SigninWithPassword(
        [FromBody] AuthDataTransformer.Signin signin
    )
    {
        var account = await _authService.SigninWithPassword(signin);
        return Ok(Mapper.Map<AuthObject.SigninWithPasswordResponse>(account));
    }

    [HttpPost(RouteMap.CONFIRM_CODE)]
    public IActionResult ConfirmCode(
        AuthDataTransformer.ConfirmCode confirmCode
    )
    {
        var account = _authService.ConfirmCode(
            confirmCode.AccountId,
            confirmCode.Code
        );
        return Ok(account);
    }

    [HttpPatch(RouteMap.RESET_PASSWORD)]
    public async Task<IActionResult> ResetPassword(
        [FromBody] AuthDataTransformer.ResetPassword resetPassword
    )
    {
        var message = await _authService.ResetPassword(resetPassword.Email);
        return Ok(message);
    }

    [HttpPatch(RouteMap.CHANGE_PASSWORD)]
    public IActionResult ChangePassword(
        [FromBody] AuthDataTransformer.ChangePassword changePassword
    )
    {
        var message = _authService.ChangePassword(changePassword);
        return Ok(message);
    }

    [HttpGet(RouteMap.GOOGLE)]
    public async Task<IActionResult> Google([FromQuery] string code)
    {
        var profile = await _authService.LoginGoogle(code);
        return Ok(profile);
    }

    [HttpPost(RouteMap.TEMPLATE_CONFIRM_CODE)]
    public async Task<IActionResult> TemplateConfirmCode(
        [FromBody] AuthDataTransformer.TemplateConfirmCode templateConfirmCode
    )
    {
        var email = await _authService.TemplateConfirmCode(templateConfirmCode);
        return Ok(email);
    }
}
