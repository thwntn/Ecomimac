namespace ReferenceDataTransformer;

public class ZaloCredentialDataTransformerObject
{
    public class Create
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string AccessToken { get; set; }

        [Required]
        public string RefreshToken { get; set; }
    }

    public class Update : Create
    {
        [Required]
        public Guid Id { get; set; }
    }
}
