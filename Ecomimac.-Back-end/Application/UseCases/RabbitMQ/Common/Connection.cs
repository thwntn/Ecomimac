namespace ReferenceMessageQueue;

public class ConnectionMessageQueue() : IConnectionMessageQueue
{
    private IConnection _connection;
    private readonly string hostname = Environment.GetEnvironmentVariable(
        nameof(EnvironmentNames.QueueHost)
    );

    private readonly string username = Environment.GetEnvironmentVariable(
        nameof(EnvironmentNames.QueueUserName)
    );

    private readonly string password = Environment.GetEnvironmentVariable(
        nameof(EnvironmentNames.QueuePassword)
    );

    public async Task CreateConnectionAsync()
    {
        ConnectionFactory connectionFactory = new();
        //  Summary:
        //      Create connection to RabbitMQ
        //
        connectionFactory.HostName = hostname;
        connectionFactory.UserName = username;
        connectionFactory.Password = password;
        //
        _connection = await connectionFactory.CreateConnectionAsync();
    }

    public async Task<QueueDeclareOk> CreateQueueAsync(string queueName)
    {
        IChannel channel = await CreateChannelAsync();
        //  Summary:
        //      Define message queue & setup queue
        //
        QueueDeclareOk queueDeclareOk = await channel.QueueDeclareAsync(
            queueName,
            false,
            false,
            true,
            default
        );
        return queueDeclareOk;
    }

    public async Task<IChannel> CreateChannelAsync()
    {
        //  Summary:
        //      Open a new connect channel to RabbitMQ
        //
        IChannel channel = await _connection.CreateChannelAsync();
        return channel;
    }
}
