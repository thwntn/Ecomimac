namespace ReferenceDataTransformer;

public class IconDataTransformer
{
    public class Create
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Directory { get; set; }

        public Guid ProfileId { get; set; }
    }
}
