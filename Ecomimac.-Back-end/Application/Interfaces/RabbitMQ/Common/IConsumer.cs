namespace ReferenceInterface;

public interface IConsumerMessageQueue
{
    Task<bool> Listen<TData>(string queueName, Func<TData, Task> action);
}
