namespace ReferenceInterface;

public interface IMailCredential
{
    IEnumerable<MailCredential> List(Guid profileId);
    MailCredential Create(
        Guid profileId,
        MailCredentialDataTransformerObject.Create create
    );
    MailCredential Information(Guid profileId, Guid emailId);
    MailCredential Update(
        Guid profileId,
        MailCredentialDataTransformerObject.Update update
    );
    string Remove(Guid profileId, Guid emailId);
}
