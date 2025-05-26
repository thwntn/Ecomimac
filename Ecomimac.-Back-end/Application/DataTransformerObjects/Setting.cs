namespace ReferenceDataTransformer;

public class SettingDataTransformer
{
    public class Update
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public string Value { get; set; }
    }
}
