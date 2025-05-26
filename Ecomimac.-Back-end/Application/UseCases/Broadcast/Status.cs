namespace ReferenceService;

public class StatusBroadcast : IStatusBroadcast
{
    public IEnumerable<BroadcastObject.Status> Execute()
    {
        string define = File.ReadAllText(
            $"{Directory.GetCurrentDirectory()}/Common/Metadata/BroadcastStatus.json"
        );

        IEnumerable<BroadcastObject.Status> statuses =
            Mapper.Deserialize<BroadcastObject.Status[]>(define);

        return statuses;
    }
}
