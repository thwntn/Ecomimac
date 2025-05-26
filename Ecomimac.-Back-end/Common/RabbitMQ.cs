namespace ReferenceFeature;

public class RabbitMQ
{
    public static async Task Configure(WebApplicationBuilder builder)
    {
        //
        //  Summary:
        //      Create connect to message queue (RabbitMQ)
        //
        //  Returns:
        //
        ConnectionMessageQueue connectionMessageQueue = new();
        await connectionMessageQueue.CreateConnectionAsync();

        await connectionMessageQueue.CreateQueueAsync(
            nameof(MessageQueueNames.MailGunQueue)
        );

        //
        //  Summary:
        //      Sign service connection to DI
        //
        //  Returns:
        //
        builder.Services.AddSingleton<IConnectionMessageQueue>(
            connectionMessageQueue
        );

        //
        //  Summary:
        //      Listen all consumer
        //
        //  Returns:
        //
        IListenMessageQueue listenMessageQueue = builder
            .Services.BuildServiceProvider()
            .GetService<IListenMessageQueue>();
        await listenMessageQueue.Execute();
    }
}
