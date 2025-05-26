namespace ReferenceService;

public interface IStatusInvoice
{
    IEnumerable<StatusInvoiceObject.Status> List();
}
