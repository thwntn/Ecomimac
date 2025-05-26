namespace ReferenceDataTransformer;

public class ProfileDataTransformer
{
    public class Update
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public string Phone { get; set; }

        [JsonRequired]
        public string Address { get; set; }

        [JsonRequired]
        public string Description { get; set; }
    }
}
