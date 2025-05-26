namespace ReferenceDataTransformer;

public class CustomerDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        public string FullName { get; set; }

        [JsonRequired]
        public string Address { get; set; }

        [JsonRequired]
        public string Phone { get; set; }

        public List<Guid>? TagIds { get; set; }
    }

    public class Update : Create
    {
        [JsonRequired]
        public Guid Id { get; set; }
    }

    public class UpdateTag
    {
        [JsonRequired]
        public List<Guid> TagIds { get; set; }
    }
}
