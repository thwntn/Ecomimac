namespace ReferenceModel;

public class BroadcastObject
{
    public class Counter(
        int runCount,
        int successCount,
        int failedCount,
        int priceEstimatePerMessage,
        int broadcastCount,
        int runningCount
    )
    {
        public int RunCount { get; set; } = runCount;
        public int BroadcastCount { get; set; } = broadcastCount;
        public int SuccessCountCount { get; set; } = successCount;
        public int FailedCount { get; set; } = failedCount;
        public int RunningCount { get; set; } = runningCount;
        public int PriceEstimatePerMessage { get; set; } =
            priceEstimatePerMessage;
    }

    public class Channel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public int Enum { get; set; }
    }

    public class KeyAndField(string key, string field)
    {
        public string Key { get; set; } = key;
        public string Field { get; set; } = field;
    }

    public class Status
    {
        public int Enum { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string BackgroundColor { get; set; }
    }
}
