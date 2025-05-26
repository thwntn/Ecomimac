namespace ReferenceService;

public class StatusInvoiceService() : IStatusInvoice
{
    public IEnumerable<StatusInvoiceObject.Status> List()
    {
        string define = File.ReadAllText(
            $"{Directory.GetCurrentDirectory()}/Common/Metadata/InvoiceStatus.json"
        );

        IEnumerable<StatusInvoiceObject.Status> status =
            Mapper.Deserialize<IEnumerable<StatusInvoiceObject.Status>>(
                define
            );

        return status;
    }
}
