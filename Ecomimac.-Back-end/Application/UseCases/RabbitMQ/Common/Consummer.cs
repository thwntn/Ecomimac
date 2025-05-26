namespace ReferenceMessageQueue;

public class ConsumerMessageQueue(
    IConnectionMessageQueue ConnectionMessageQueue
) : IConsumerMessageQueue
{
    private readonly IConnectionMessageQueue _connectionMessageQueue =
        ConnectionMessageQueue;
    private readonly ushort DEFAULT_FETCH_SIZE = 5;

    public async Task<bool> Listen<TData>(
        string queueName,
        Func<TData, Task> action
    )
    {
        IChannel channel = await _connectionMessageQueue.CreateChannelAsync();
        await channel.BasicQosAsync(default, DEFAULT_FETCH_SIZE, false);

        AsyncEventingBasicConsumer consumer = new(channel);
        consumer.ReceivedAsync += async (_, arguments) =>
        {
            try
            {
                //  Summary:
                //      Convert to byte data
                byte[] bytes = new byte[arguments.Body.Length];
                arguments.Body.Span.CopyTo(bytes);

                //  Summary:
                //      Read text from byte
                string response = Encoding.UTF8.GetString(bytes);

                //  Summary:
                //      Re-action sign consumer
                await action(
                    Mapper.Deserialize<TData>(
                        Mapper.Deserialize<string>(response)
                    )
                );

                //  Summary:
                //      Return status ack
                await channel.BasicAckAsync(arguments.DeliveryTag, false);
            }
            catch (Exception exception)
            {
                Logger.Warning(exception);
            }
        };

        await channel.BasicConsumeAsync(
            queue: queueName,
            autoAck: false,
            consumer: consumer
        );

        return true;
    }
}
