namespace ReferenceDataTransformer;

public class PaymentDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }
    }
}
