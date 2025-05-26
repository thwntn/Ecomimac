namespace ReferenceModel;

public class HistoryObject
{
    public class Status
    {
        public int Enum { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string BackgroundColor { get; set; }
    }

    public class Parse(string key, string value)
    {
        public string Key { get; set; } = key;
        public string Value { get; set; } = value;
    }

    public class Response
    {
        public string Contact { get; set; }
        public string SendingId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public int Times { get; set; }
        public int Status { get; set; }
    }

    public class Counter(
        int runCount,
        int successCount,
        int failedCount,
        int priceEstimatePerMessage
    )
    {
        public int RunCount { get; set; } = runCount;
        public int SuccessCountCount { get; set; } = successCount;
        public int FailedCount { get; set; } = failedCount;
        public int PriceEstimatePerMessage { get; set; } =
            priceEstimatePerMessage;
    }
}
