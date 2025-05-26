namespace ReferenceDataTransformer;

public class PromotionDataTransformer
{
    public class PromotionProduct
    {
        [JsonRequired]
        public int Quantity { get; set; }

        public int FreeQuantity { get; set; }

        [JsonRequired]
        public Guid ProductId { get; set; }

        public Guid FreeProductId { get; set; }

        public PromotionProductType PromotionProductType { get; set; }
    }

    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        [JsonRequired]
        public DateTime FromDate { get; set; }

        [JsonRequired]
        public DateTime ToDate { get; set; }

        [JsonRequired]
        public PromotionType PromotionType { get; set; }

        [JsonRequired]
        public List<Guid> TagIds { get; set; }

        [JsonRequired]
        public List<PromotionProduct> PromotionProducts { get; set; }
    }

    public class Update : Create
    {
        [JsonRequired]
        public Guid Id { get; set; }
    }
}
