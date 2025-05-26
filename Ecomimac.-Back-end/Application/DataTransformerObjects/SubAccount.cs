namespace ReferenceDataTransformer;

public class ExtraDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string UserName { get; set; }

        [JsonRequired]
        public string Password { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        [JsonRequired]
        public string Email { get; set; }

        [JsonRequired]
        public string Name { get; set; }
    }

    public class Signin
    {
        [JsonRequired]
        public string RootEmail { get; set; }

        [JsonRequired]
        public string UserName { get; set; }

        [JsonRequired]
        public string Password { get; set; }
    }

    public class Switch
    {
        [JsonRequired]
        public string UserName { get; set; }
    }

    public class Lock
    {
        [JsonRequired]
        public Guid AccountId { get; set; }
    }
}
