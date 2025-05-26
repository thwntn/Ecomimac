namespace ReferenceService;

public class AuthService(
    DatabaseContext databaseContext,
    IJwt jwtService,
    IMail mailService,
    IGoogle googleService,
    IRole roleService,
    IProfile profileService,
    IPayment paymentService
) : IAuth
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;
    private readonly IRole _roleService = roleService;
    private readonly IMail _mailService = mailService;
    private readonly IGoogle _googleService = googleService;
    private readonly IProfile _profileService = profileService;
    private readonly IPayment _paymentService = paymentService;

    public async Task<Account> Signup(AuthDataTransformer.Signup signup)
    {
        bool existEmail = _databaseContext.Account.Any(user =>
            user.Email == signup.Email
        );
        if (existEmail)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.EMAIL_EXIST
            );

        string hashPassword = Cryptography.Md5(signup.Password);
        string code = Cryptography.RandomCode();

        Account account = new(
            signup.Email,
            hashPassword,
            string.Empty,
            code,
            AccountStatus.Valid,
            AccountNames.Email
        );
        _databaseContext.Add(account);
        Profile profile = new(signup.Name, signup.Email, signup.Description)
        {
            Birthday = signup.Birthday,
            AccountId = account.Id,
        };

        _databaseContext.Add(profile);
        _databaseContext.SaveChanges();

        await _mailService.TemplateConfirmCode(account.Email, code);
        InitDefault(account);

        return account;
    }

    public bool VerifyEmail(AuthDataTransformer.VerifyEmail verifyEmail)
    {
        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .FirstOrDefault(account => account.Email == verifyEmail.Email)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_EMAIL
            );
        return true;
    }

    public async Task<Account> SigninWithPassword(
        AuthDataTransformer.Signin signin
    )
    {
        string hashPassword = Cryptography.Md5(signin.Password);

        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .Include(account => account.LoginAccounts)
                .Include(account => account.RoleAccounts)
                .ThenInclude(roleAccount => roleAccount.Role)
                .FirstOrDefault(account =>
                    account.Email == signin.Email
                    && account.HashPassword == hashPassword
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        if (account.AccountStatus == AccountStatus.Open)
            account.Token = _jwtService.GenerateToken(
                account.Profile.Id,
                account.Id,
                Guid.Empty
            );
        else
        {
            string code = Cryptography.RandomCode();
            account.Code = code;
            _databaseContext.Update(account);
            _databaseContext.SaveChanges();

            await _mailService.TemplateConfirmCode(account.Email, code);
        }

        DateTime loginTime = Timebase.Now();
        LoginAccount accountLogin = new()
        {
            Created = loginTime,
            AccountId = account.Id,
        };
        _databaseContext.Add(accountLogin);
        _databaseContext.SaveChanges();

        account.Profile.LastLogin = loginTime;
        return account;
    }

    public Account ConfirmCode(Guid accountId, string code)
    {
        Account account = _profileService.GetAccountWithRole(accountId);
        if (account.Code != code)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.CONFIRM_CODE_NOT_SUCCESS
            );

        account.AccountStatus = AccountStatus.Open;
        _databaseContext.Update(account);
        _databaseContext.SaveChanges();

        account.Token = _jwtService.GenerateToken(
            account.Profile.Id,
            account.Id,
            Guid.Empty
        );

        return account;
    }

    public async Task<string> ResetPassword(string email)
    {
        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .FirstOrDefault(account => account.Email == email)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        string password = Cryptography.RandomCode();
        account.HashPassword = Cryptography.Md5(password);

        await _mailService.TemplateConfirmCode(email, password);

        _databaseContext.Update(account);
        _databaseContext.SaveChanges();

        return MessageConstant.REQUEST_SUCCESS;
    }

    public string ChangePassword(
        AuthDataTransformer.ChangePassword changePassword
    )
    {
        string hashPassword = Cryptography.Md5(changePassword.Password);
        Account account =
            _databaseContext
                .Account.Include(user => user.Profile)
                .FirstOrDefault(user =>
                    user.Email == changePassword.Email
                    && user.HashPassword == hashPassword
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        if (changePassword.NewPassword == changePassword.ConfirmPassword)
            account.HashPassword = Cryptography.Md5(changePassword.NewPassword);
        else
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.PASSWORD_NOT_MATCH
            );

        _mailService.TemplateConfirmCode(
            changePassword.Email,
            changePassword.NewPassword
        );

        _databaseContext.Update(account);
        _databaseContext.SaveChanges();

        return MessageConstant.REQUEST_SUCCESS;
    }

    private void InitDefault(Account account)
    {
        _roleService.MakeAdminAccount(account.Id);
    }

    public async Task<Profile> LoginGoogle(string authCode)
    {
        MGoogle.AccessTokenResponse fromGg =
            await _googleService.GetAccessToken(authCode);

        if (fromGg is null)
            return null;

        MGoogle.AccessTokenResponse objectToken =
            Mapper.Map<MGoogle.AccessTokenResponse>(fromGg);
        MGoogle.ProfileResponse getProfileResponse =
            await _googleService.Profile(objectToken.access_token);

        if (getProfileResponse is null)
            return null;

        MGoogle.ProfileResponse info = Mapper.Map<MGoogle.ProfileResponse>(
            getProfileResponse
        );
        Account account = _databaseContext.Account.FirstOrDefault(user =>
            user.Google.Sub == info.sub
        );
        Profile handler = InsertInfo(info);
        return handler;
    }

    private Profile InsertInfo(MGoogle.ProfileResponse info)
    {
        Profile profile = new(string.Empty, string.Empty, string.Empty);

        _databaseContext.Add(profile);
        _databaseContext.SaveChanges();
        return profile;
    }

    public async Task<string> TemplateConfirmCode(
        AuthDataTransformer.TemplateConfirmCode templateConfirmCode
    )
    {
        await _mailService.TemplateConfirmCode(
            templateConfirmCode.Email,
            0.ToString()
        );
        return templateConfirmCode.Email;
    }
}
