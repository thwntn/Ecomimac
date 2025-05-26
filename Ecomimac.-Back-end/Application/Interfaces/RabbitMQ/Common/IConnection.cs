namespace ReferenceInterface;

public interface IConnectionMessageQueue
{
    Task CreateConnectionAsync();
    Task<QueueDeclareOk> CreateQueueAsync(string queueName);
    Task<IChannel> CreateChannelAsync();
}
