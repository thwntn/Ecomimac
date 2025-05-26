namespace ReferenceService;

public class StatusHistory() : IStatusHistory
{
    public IEnumerable<HistoryObject.Status> Execute()
    {
        string define = File.ReadAllText(
            $"{Directory
                .GetCurrentDirectory()}/Common/Metadata/HistoryStatus.json"
        );

        IEnumerable<HistoryObject.Status> statuses =
            Mapper.Deserialize<HistoryObject.Status[]>(define);

        return statuses;
    }
}
