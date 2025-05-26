namespace ReferenceInterface;

public class MailSendingBroadcast(
    IConnectionMessageQueue connectionMessageQueue,
    IHandleActiveBroadcast handleActiveBroadcast,
    IProducerMessageQueue producerMessageQueue
) : IMailSendingBroadcast
{
    private readonly IConnectionMessageQueue _connectionMessageQueue =
        connectionMessageQueue;
    private readonly IProducerMessageQueue _producerMessageQueue =
        producerMessageQueue;
    private readonly IHandleActiveBroadcast _handleActiveBroadcast =
        handleActiveBroadcast;
    private readonly int PATH_SIZE = 1000;

    static HistoryStatus ValidatedContactEmail(string identity)
    {
        if (identity.Justifiable() is false)
            return HistoryStatus.FAILED;

        if (Validate.Email(identity) is false)
            return HistoryStatus.CONTACT_NOT_VALID_FORMAT;

        return HistoryStatus.SUCCESS;
    }

    public async Task MailGun(Guid profileId, Broadcast broadcast)
    {
        int page = 1;
        using IChannel channel =
            await _connectionMessageQueue.CreateChannelAsync();
        while (true)
        {
            List<Dictionary<string, string>> contacts =
                _handleActiveBroadcast.ContactExtension(
                    profileId,
                    broadcast.DataId,
                    new() { Limit = PATH_SIZE, Page = page }
                );

            page++;
            if (contacts.Count is 0)
                break;

            BroadcastQueueObject.SendingMailgunTransport sendingMailgunTransport =
                new(
                    broadcast.Id,
                    broadcast.MailCredential,
                    contacts.Select(contact =>
                    {
                        Guid sendingId = Cryptography.RandomGuid();

                        if (broadcast.SendKey.Justifiable() is false)
                            throw new HttpException(
                                HttpStatus.BadRequest,
                                MessageConstant.NOT_FOUND_SEND_KEY
                            );

                        //  Summary:
                        //      Merge content template with mapping data
                        //
                        string mappedContent =
                            _handleActiveBroadcast.MapContent(
                                broadcast,
                                contact
                            );
                        EmailObject.JsonData jsonData = new(
                            broadcast.Name,
                            mappedContent
                        );

                        contact.TryGetValue(
                            broadcast.SendKey,
                            out string identity
                        );

                        return new History(
                            Format.Default(identity, string.Empty),
                            ChannelBroadcast.EMAIl,
                            Format.Default(
                                Mapper.Serialize(jsonData),
                                string.Empty
                            ),
                            ValidatedContactEmail(identity),
                            broadcast.Id,
                            profileId,
                            sendingId,
                            broadcast.Times
                        );
                    })
                );

            //  Summary:
            //      Publish message to RabbitMQ
            await _producerMessageQueue.Publish(
                channel,
                nameof(MessageQueueNames.MailGunQueue),
                sendingMailgunTransport
            );
        }
    }
}
