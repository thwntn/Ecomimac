namespace ReferenceDataTransformer;

public class ExpenseTransactionDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public DateTime DateTime { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        [JsonRequired]
        public string Amount { get; set; }
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
