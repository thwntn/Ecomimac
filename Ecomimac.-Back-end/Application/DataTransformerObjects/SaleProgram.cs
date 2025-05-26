namespace ReferenceDataTransformer;

public class SaleProgramDataTransformer
{
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
        public List<Guid> PromotionIds { get; set; }

        [JsonRequired]
        public List<Guid> DiscountIds { get; set; }

        [JsonRequired]
        public List<Guid> ProductIds { get; set; }
    }

    public class Update : Create
    {
        [JsonRequired]
        public Guid Id { get; set; }
    }

    public class UpdateStatus
    {
        [JsonRequired]
        public SaleProgramStatus Status { get; set; }
    }

    public class Report
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
