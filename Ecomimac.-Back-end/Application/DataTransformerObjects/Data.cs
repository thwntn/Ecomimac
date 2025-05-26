namespace ReferenceDataTransformer;

public class DataTransformerObject
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public ReferenceShared.DataType Type { get; set; }

        public string Description { get; set; }
    }
}
