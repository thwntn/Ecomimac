namespace ReferenceDataTransformer;

public class KabanCategoryDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }
    }

    public class Update
    {
        [JsonRequired]
        public Guid Id { get; set; }

        [JsonRequired]
        public string Name { get; set; }
    }
}
