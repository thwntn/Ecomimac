namespace ReferenceFeature;

public class Host
{
    public static void Information()
    {
        Logger.Success(
            $"[System] Now listening on: {Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.Host)
        )}"
        );

        Logger.Success(
            $"[Message Queue] Connected to: {Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.QueueHost)
        )}"
        );

        Logger.Success(
            $"[System] TimeZone: {Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.TimeZone)
        )}"
        );
    }
}
