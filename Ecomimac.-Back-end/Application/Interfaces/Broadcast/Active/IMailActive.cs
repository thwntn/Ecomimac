namespace ReferenceInterface;

public interface IMailSendingBroadcast
{
    Task MailGun(Guid profileId, Broadcast broadcast);
}
