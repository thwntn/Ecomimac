namespace ReferenceDataTransformer;

public class ActivityDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public IEnumerable<Activity> Activities { get; set; }
    }

    public class Activity
    {
        [JsonRequired]
        public string Type { get; set; }

        [JsonRequired]
        public string JsonData { get; set; }
    }
}
