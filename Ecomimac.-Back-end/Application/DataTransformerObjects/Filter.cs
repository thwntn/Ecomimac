namespace ReferenceDataTransformer;

public class FilterDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Column { get; set; }

        [JsonRequired]
        public Condition Operator { get; set; }

        [JsonRequired]
        public string Value { get; set; }

        [JsonRequired]
        public Guid DataId { get; set; }
    }
}
