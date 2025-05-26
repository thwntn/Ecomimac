namespace ReferenceInterface;

public interface IInvoice
{
    Pagination<Invoice> List(Guid profileId, QueryOptions queryOptions);
    Invoice Create(Guid profileId, InvoiceDataTransformer.Create create);
    string Remove(Guid profileId, Guid invoiceId);
    InvoiceProduct AddProduct(
        Guid profileId,
        InvoiceDataTransformer.AddProduct addProduct
    );
    Invoice Info(Guid profileId, Guid invoiceId);
    void ScannerProduct(Guid profileId, InvoiceDataTransformer.Scanner scanner);
    IEnumerable<Activity> Log(string invoiceCode);
    IEnumerable<StatusInvoiceObject.Status> Counter(Guid profileId);
    Invoice Status(Guid profileId, Guid invoiceId, InvoiceStatus invoiceStatus);
    IEnumerable<Invoice> Recent(Guid profileId);
    IEnumerable<Discount> Discount(Guid profileId);
    InvoiceObject.BankingAccount BankAccount(Guid profileId);
    void OpenTransaction(
        Guid profileId,
        InvoiceDataTransformer.OpenTransaction openTransaction
    );
    void ResetCache(Guid profileId);
    void CloseTransaction(Guid profileId);
}
