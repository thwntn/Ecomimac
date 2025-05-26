namespace ReferenceDataTransformer;

public class ProductDataTransformer
{
    public class Create
    {
        public Guid Id { get; set; }

        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public long Price { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        [JsonRequired]
        public string HtmlDetail { get; set; }

        [JsonRequired]
        public double Sale { get; set; }

        [JsonRequired]
        public List<Guid> TagIds { get; set; }
    }

    public class Update : Create { }
}
