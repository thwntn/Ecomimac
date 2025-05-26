namespace ReferenceModel;

public class InvoiceObject
{
    public class Total
    {
        public long quantity;
        public int invoices;
    }

    public class Paid : Total { }

    public class Unpaid : Total { }

    public class Scanner(Guid profileId, Guid productId, string code)
    {
        public Guid ProfileId { get; set; } = profileId;
        public Guid ProductId { get; set; } = productId;
        public string Code { get; set; } = code;
    }

    public class Counter(InvoiceStatus key, long quantity, long totalCost)
    {
        public InvoiceStatus Key { get; set; } = key;
        public long Quantity { get; set; } = quantity;
        public long TotalCost { get; set; } = totalCost;
    }

    public class BankingAccount(
        string accountNo,
        string accountName,
        string bankId
    )
    {
        public string AccountNo { get; set; } = accountNo;
        public string BankId { get; set; } = bankId;
        public string AccountNane { get; set; } = accountName;
    }
}
