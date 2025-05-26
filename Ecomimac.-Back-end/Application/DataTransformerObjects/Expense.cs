namespace ReferenceDataTransformer;

public class ExpenseDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public DateTime DateTime { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        public long Budget { get; set; }

        [JsonRequired]
        public Guid ExpenseCategoryId { get; set; }
    }

    public class Update : Create
    {
        [JsonRequired]
        public Guid Id { get; set; }
    }

    public class Remove
    {
        public List<Guid> Ids { get; set; }
    }
}
