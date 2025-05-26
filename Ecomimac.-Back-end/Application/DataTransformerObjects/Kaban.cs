namespace ReferenceDataTransformer;

public class KabanDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Title { get; set; }

        [JsonRequired]
        public Guid KabanCategoryId { get; set; }

        [JsonRequired]
        public string HtmlContent { get; set; }
    }

    public class Update
    {
        [JsonRequired]
        public Guid Id { get; set; }

        [JsonRequired]
        public string Name { get; set; }
    }

    public class Move
    {
        [JsonRequired]
        public Guid KabanId { get; set; }

        [JsonRequired]
        public Guid DestinationKabanCategoryId { get; set; }
    }
}
