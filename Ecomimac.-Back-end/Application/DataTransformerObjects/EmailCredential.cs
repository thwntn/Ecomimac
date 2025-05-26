namespace ReferenceDataTransformer;

public class MailCredentialDataTransformerObject
{
    public class Create
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Domain { get; set; }

        [Required]
        public string From { get; set; }

        [Required]
        public string ApiKey { get; set; }
    }

    public class Update : Create
    {
        [Required]
        public Guid Id { get; set; }
    }
}
