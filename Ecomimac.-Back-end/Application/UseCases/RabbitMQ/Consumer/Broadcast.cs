namespace ReferenceMessageQueue;

public class BroadcastConsumer(
    IConsumerMessageQueue consumerMessageQueue,
    IMail mailService,
    ICreateHistory createHistory
) : IBroadcastConsumer
{
    private readonly ICreateHistory _createHistory = createHistory;
    private readonly IMail _mailService = mailService;
    private readonly IConsumerMessageQueue _consumerMessageQueue =
        consumerMessageQueue;

    public async Task Execute()
    {
        await _consumerMessageQueue.Listen<BroadcastQueueObject.SendingMailgunTransport>(
            nameof(MessageQueueNames.MailGunQueue),
            async (sendingMailgunTransport) =>
            {
                //
                //  Summary:
                //      Select, create async sending
                //
                //  Returns:
                //
                var actions = sendingMailgunTransport.Histories.Select(
                    async (history) =>
                    {
                        EmailObject.JsonData jsonData =
                            Mapper.Deserialize<EmailObject.JsonData>(
                                history.JsonData
                            );
                        //  Summary:
                        //      If not validate success -> not request to mailgun
                        if (history.Status is not HistoryStatus.SUCCESS)
                            return;

                        bool status = await _mailService.Broadcast(
                            sendingMailgunTransport.MailCredential,
                            new(
                                history.Contact,
                                jsonData.Content,
                                jsonData.Subject
                            )
                        );

                        if (status is false)
                            history.Status =
                                HistoryStatus.ERROR_WHEN_REQUEST_TO_MAILGUN;
                    }
                );

                await Task.WhenAll(actions);
                await _createHistory.Execute(
                    sendingMailgunTransport.BroadcastId,
                    sendingMailgunTransport.Histories
                );
            }
        );
    }
}
