namespace ReferenceDataTransformer;

public class InvoiceDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Code { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        public Guid DiscountId { get; set; }

        public StatusInvoiceObject.Status Status { get; set; }

        [JsonRequired]
        public List<ProductCreate> InvoiceProducts { get; set; }

        [JsonRequired]
        public Guid ProfileId { get; set; }

        public Guid CustomerId { get; set; }

        [JsonRequired]
        public PaymentObject.Payment Payment { get; set; }

        [JsonRequired]
        public MonetaryUnit MonetaryUnit { get; set; }
    }

    public class ProductCreate
    {
        [JsonRequired]
        public Guid Id { get; set; }

        [JsonRequired]
        public long Quantity { get; set; }
    }

    public class ChangeDescription
    {
        [JsonRequired]
        public string Description { get; set; }
    }

    public class ChangeCustomer
    {
        [JsonRequired]
        public Guid CustomerId { get; set; }
    }

    public class ChangePaymentMethod
    {
        [JsonRequired]
        public Guid PaymentMethod { get; set; }
    }

    public class RemoveProduct { }

    public class AddProduct
    {
        [JsonRequired]
        public Guid ProductId { get; set; }

        [JsonRequired]
        public Guid InvoiceId { get; set; }

        [JsonRequired]
        public long Quantity { get; set; }
    }

    public class Scanner
    {
        [JsonRequired]
        public Guid ProductId { get; set; }

        [JsonRequired]
        public string Code { get; set; }
    }

    public class Status
    {
        [JsonRequired]
        public InvoiceStatus InvoiceStatus { get; set; }
    }

    public class OpenTransaction
    {
        [JsonRequired]
        public long Amount { get; set; }

        [JsonRequired]
        public string Code { get; set; }
    }
}
