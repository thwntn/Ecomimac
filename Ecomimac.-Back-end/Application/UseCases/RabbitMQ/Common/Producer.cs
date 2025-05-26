namespace ReferenceMessageQueue;

public class ProducerMessageQueue(
    IConnectionMessageQueue connectionMessageQueue
) : IProducerMessageQueue
{
    private readonly IConnectionMessageQueue _connectionMessageQueue =
        connectionMessageQueue;

    public async Task<bool> Publish<TFormat>(
        IChannel channel,
        string queueName,
        TFormat data
    )
    {
        try
        {
            byte[] binaryText = Encoding.UTF8.GetBytes(Mapper.JsonString(data));

            await channel.BasicPublishAsync(
                string.Empty,
                queueName,
                false,
                new BasicProperties()
                {
                    DeliveryMode = DeliveryModes.Transient,
                },
                binaryText,
                CancellationToken.None
            );

            return true;
        }
        catch (Exception exception)
        {
            Logger.Log(exception);
            return false;
        }
    }
}
