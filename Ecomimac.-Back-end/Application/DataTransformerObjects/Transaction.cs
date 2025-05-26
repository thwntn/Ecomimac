namespace ReferenceDataTransformer;

public class TransactionDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public int Limit { get; set; }

        [JsonRequired]
        public long Pricing { get; set; }
    }

    public class SepayRequest
    {
        public string Id { get; set; }
        public string Gateway { get; set; }
        public string TransactionDate { get; set; }
        public string AccountNumber { get; set; }
        public string Code { get; set; }
        public string Content { get; set; }
        public string RransferType { get; set; }
        public long TransferAmount { get; set; }
        public string Accumulated { get; set; }
        public string SubAccount { get; set; }
        public string ReferenceCode { get; set; }
        public string Description { get; set; }
    }
}
