namespace ReferenceService;

public class MailService(IRequest requestService) : IMail
{
    private readonly IRequest _requestService = requestService;

    public async Task<bool> Broadcast(
        MailCredential mailCredential,
        EmailDataTransformerObject.Send send
    )
    {
        if (mailCredential.Disable is true)
            return default;

        string basicAuth = Convert.ToBase64String(
            Encoding.ASCII.GetBytes(
                $"{mailCredential.UserName}:{mailCredential.ApiKey}"
            )
        );

        bool status = await Send(
            mailCredential.Domain,
            basicAuth,
            mailCredential.From,
            send.To,
            send.Subject,
            send.Html
        );

        return status;
    }

    public async Task TemplateConfirmCode(string toEmail, string code)
    {
        string username = Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.MaiUserName)
        );
        string key = Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.MailApiKey)
        );
        string from = Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.MailFrom)
        );
        string domain = Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.MailDomain)
        );

        //  Summary:
        //      Read template html from metadata
        string content = File.ReadAllText(
                Directory.GetCurrentDirectory()
                    + "/Common/Metadata/ConfirmCode.html"
            )
            .Replace("__CODE__", code);

        //  Summary:
        //      Send email to client
        await Send(
            domain,
            key,
            from,
            toEmail,
            MessageConstant.SYSTEM_SUBJECT_EMAIL_CONFIRM_CODE,
            content
        );
    }

    public async Task<bool> Send(
        string domain,
        string authorization,
        string from,
        string to,
        string subject,
        string html
    )
    {
        string[] keys =
        [
            nameof(subject),
            nameof(from),
            nameof(to),
            nameof(html),
        ];
        string[] values = [subject, from, to, html];

        FormUrlEncodedContent content = new(
            keys.Zip(values, (key, value) => new { key, value })
                .ToDictionary(key => key.key, value => value.value)
        );

        object response = await _requestService.FormUrlEncoded<object>(
            string.Concat("https://api.mailgun.net/v3/", domain, "/messages"),
            content,
            Mapper.Map<Dictionary<string, string>>(
                new { Authorization = "Basic " + authorization }
            )
        );

        return response.Justifiable();
    }
}
