namespace ReferenceDataTransformer;

public class FundDataTransformer
{
    public class Create
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string BackgroundUrl { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Number { get; set; }

        [Required]
        public string Author { get; set; }
    }
}
