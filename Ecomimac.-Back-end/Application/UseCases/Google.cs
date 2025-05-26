namespace ReferenceService;

public class GoogleService : IGoogle
{
    public async Task<MGoogle.AccessTokenResponse> GetAccessToken(
        string authCode
    )
    {
        string url =
            Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.OauthHost)
            ) + "/token";
        MGoogle.GetAccessToken content =
            new(
                authCode,
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.ClientId)
                ),
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.SecretId)
                ),
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.GoogleRedirect)
                ),
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.GrandType)
                )
            );

        FormUrlEncodedContent f =
            new(Mapper.Map<Dictionary<string, string>>(content));
        HttpResponseMessage rs = await new HttpClient().PostAsync(url, f);

        string s = await rs.Content.ReadAsStringAsync();
        MGoogle.AccessTokenResponse assess =
            Mapper.Deserialize<MGoogle.AccessTokenResponse>(s);

        if (assess.access_token is null)
            return null;

        return assess;
    }

    public async Task<MGoogle.ProfileResponse> Profile(string accessToken)
    {
        string url =
            Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.ProfileHost)
            ) + $"/oauth2/v3/userinfo?access_token={accessToken}";
        Logger.Json(url);
        HttpResponseMessage rs = await new HttpClient().GetAsync(url);

        string s = await rs.Content.ReadAsStringAsync();
        MGoogle.ProfileResponse info =
            Mapper.Deserialize<MGoogle.ProfileResponse>(s);

        if (info.sub is null)
            return null;

        return info;
    }
}
