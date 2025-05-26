namespace ReferenceService;

public class JwtService(
    IHttpContextAccessor httpContextAccessor,
    DatabaseContext databaseContext
) : IJwt
{
    private readonly DateTime _timeoutSession = DateTime.UtcNow.AddDays(14);
    private readonly IHttpContextAccessor _httpContextAccessor =
        httpContextAccessor;
    private readonly DatabaseContext _databaseContext = databaseContext;

    public void SetCookie(IResponseCookies responseCookies, object data)
    {
        responseCookies.Append(
            nameof(Cookie),
            Mapper.Serialize(Mapper.Map<Account>(data)),
            new()
            {
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                IsEssential = true,
                Secure = false,
                Domain = string.Empty,
                Expires = _timeoutSession,
                HttpOnly = false,
            }
        );
    }

    public string GenerateToken(Guid profileId, Guid accountId, Guid parentId)
    {
        Dictionary<string, object> claims =
            new()
            {
                {
                    nameof(ReferenceModel.Information.ProfileId),
                    string.Concat(profileId)
                },
                {
                    nameof(ReferenceModel.Information.AccountId),
                    string.Concat(accountId)
                },
                {
                    nameof(ReferenceModel.Information.ParentId),
                    string.Concat(parentId)
                },
            };
        SecurityTokenDescriptor securityTokenDescriptor =
            new()
            {
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(168)),
                Issuer = Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.Issuer)
                ),
                Audience = Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.Audience)
                ),
                Claims = claims,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            Environment.GetEnvironmentVariable(
                                nameof(EnvironmentNames.JwtKey)
                            )
                        )
                    ),
                    SecurityAlgorithms.HmacSha256
                ),
            };

        JwtSecurityTokenHandler jwtSecurityTokenHandler = new();
        SecurityToken token = jwtSecurityTokenHandler.CreateToken(
            securityTokenDescriptor
        );

        string jwt = jwtSecurityTokenHandler.WriteToken(token);
        return jwt;
    }

    public Information ReadToken(HttpRequest httpRequest)
    {
        JwtSecurityTokenHandler jwtSecurityTokenHandler = new();
        _ = AuthenticationHeaderValue.TryParse(
            httpRequest.Headers[HeaderNames.Authorization],
            out AuthenticationHeaderValue headerValue
        );
        SecurityToken token = jwtSecurityTokenHandler.ReadToken(
            headerValue.Parameter
        );
        JwtSecurityToken jwtSecurityToken = (JwtSecurityToken)token;
        return Mapper.Map<Information>(jwtSecurityToken.Payload);
    }

    public Information Information()
    {
        Information jwtPayload = ReadToken(
            _httpContextAccessor.HttpContext.Request
        );
        return jwtPayload;
    }

    public Account Account()
    {
        Information information = Information();

        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .Include(account => account.RoleAccounts)
                .ThenInclude(roleAccounts => roleAccounts.Role)
                .FirstOrDefault(account => account.Id == information.AccountId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        return account;
    }

    public IEnumerable<Account> AccountSystem()
    {
        Information information = Information();
        Guid parentId =
            information.ParentId == Guid.Empty
                ? information.AccountId
                : information.ParentId;

        IEnumerable<Account> accounts = _databaseContext
            .Account.Include(account => account.Profile)
            .Where(account =>
                account.ParentAccountId == parentId || account.Id == parentId
            )
            .AsEnumerable();

        return accounts;
    }
}
