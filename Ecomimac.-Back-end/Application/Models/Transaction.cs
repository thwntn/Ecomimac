namespace ReferenceModel;

public class TransactionObject
{
    public class Package
    {
        public string Name { get; set; }
        public int Limit { get; set; }
        public long Pricing { get; set; }
    }

    public class MessageResponse()
    {
        public bool Success { get; set; } = true;
    }
}
