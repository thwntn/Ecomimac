namespace ReferenceInterface;

public interface IMail
{
    Task<bool> Broadcast(
        MailCredential mailCredential,
        EmailDataTransformerObject.Send send
    );
    Task TemplateConfirmCode(string toEmail, string code);
    Task<bool> Send(
        string domain,
        string authorization,
        string from,
        string to,
        string subject,
        string html
    );
}
