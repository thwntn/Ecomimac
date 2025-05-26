namespace ReferenceDataTransformer;

public class ExpenseCategoryDataTransformer
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
        public List<Guid> TagIds { get; set; }
    }

    public class Update : Create
    {
        [JsonRequired]
        public Guid Id { get; set; }
    }

    public class Clone
    {
        public Guid FromId { get; set; }
        public Guid ToId { get; set; }
    }

    public class UpdateTag
    {
        [JsonRequired]
        public List<Guid> TagIds { get; set; }
    }
}
