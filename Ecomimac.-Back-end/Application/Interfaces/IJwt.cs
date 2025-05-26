namespace ReferenceInterface;

public interface IJwt
{
    string GenerateToken(Guid profileId, Guid accountId, Guid parentId);
    void SetCookie(IResponseCookies responseCookies, object data);
    Information ReadToken(HttpRequest httpRequest);
    IEnumerable<Account> AccountSystem();
    Information Information();
    Account Account();
}
