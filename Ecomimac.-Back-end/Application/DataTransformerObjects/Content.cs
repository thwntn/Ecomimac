namespace ReferenceDataTransformer;

public class ContentDataTransformerObject
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public ChannelBroadcast Mode { get; set; }

        public string? Description { get; set; }
    }

    public class Update : Content { }
}
