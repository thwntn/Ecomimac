namespace ReferenceInterface;

public class BroadcastQueueObject
{
    public class SendingMailgunTransport(
        Guid broadcastId,
        MailCredential mailCredential,
        IEnumerable<History> histories
    )
    {
        public Guid BroadcastId { get; set; } = broadcastId;
        public MailCredential MailCredential { get; set; } = mailCredential;
        public IEnumerable<History> Histories { get; set; } = histories;
    }
}
