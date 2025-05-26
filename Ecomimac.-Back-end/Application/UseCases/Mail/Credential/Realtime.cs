namespace ReferenceService;

public class RealtimeCredentialMail(IConnectionHub connectionHub)
    : IRealtimeCredentialMail
{
    public void Execute(Guid profileId) =>
        connectionHub.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.MAIL_CREDENTIAL),
            default
        );
}
