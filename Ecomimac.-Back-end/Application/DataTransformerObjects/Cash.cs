namespace ReferenceDataTransformer;

public class CashDataTransformer
{
    public class Create
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public long Quantity { get; set; }
    }
}
