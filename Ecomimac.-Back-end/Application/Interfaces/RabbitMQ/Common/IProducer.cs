namespace ReferenceInterface;

public interface IProducerMessageQueue
{
    Task<bool> Publish<TFormat>(
        IChannel channel,
        string queueName,
        TFormat data
    );
}
