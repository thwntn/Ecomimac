namespace ReferenceMessageQueue;

public class ListenMessageQueue(IBroadcastConsumer broadcastConsumer)
    : IListenMessageQueue
{
    private readonly IBroadcastConsumer _broadcastConsumer = broadcastConsumer;

    public async Task Execute()
    {
        await _broadcastConsumer.Execute();
    }
}
