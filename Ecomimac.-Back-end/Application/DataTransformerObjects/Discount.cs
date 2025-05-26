namespace ReferenceDataTransformer;

public class DiscountDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        [JsonRequired]
        public DiscountCode DiscountCode { get; set; }

        [JsonRequired]
        public DiscountType DiscountType { get; set; }

        [JsonRequired]
        public DiscountTimeFrameType DiscountTimeFrameType { get; set; }

        [JsonRequired]
        public DiscountQuantityType DiscountQuantityType { get; set; }

        [JsonRequired]
        public List<Guid> TagIds { get; set; }

        public double Percent { get; set; }

        public long Amount { get; set; }

        public long MaxAmount { get; set; }

        public int Quantity { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }

    public class Update : Create
    {
        [JsonRequired]
        public Guid Id;
    }

    public class ChangeStatus
    {
        [JsonRequired]
        public DiscountStatus Status { get; set; }
    }

    public class DiscountQuery : QueryOptions
    {
        public DiscountType DiscountType { get; set; }
    }
}
