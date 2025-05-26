namespace ReferenceModel;

public class PaymentObject
{
    public class Payment
    {
        public PaymentMethod Key { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
