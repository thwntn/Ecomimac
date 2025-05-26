namespace ReferenceInterface;

public interface ISaleProgram
{
    SaleProgram Create(
        Guid profileId,
        SaleProgramDataTransformer.Create create
    );
    SaleProgram Update(
        Guid profileId,
        SaleProgramDataTransformer.Update update
    );
    SaleProgramObject.Counter Counter(Guid profileId);
    IEnumerable<SaleProgramObject.Status> Status();
    Pagination<Invoice> Invoices(
        Guid profileId,
        Guid saleProgramId,
        QueryOptions queryOptions
    );
    IEnumerable<SaleProgramObject.Report> Report(
        Guid profileId,
        Guid saleProgramId
    );
    SaleProgramObject.Revenue Revenue(Guid profileId, Guid saleProgramId);
    public SaleProgram UpdateStatus(
        Guid profileId,
        Guid saleProgramId,
        SaleProgramDataTransformer.UpdateStatus updateStatus
    );
    SaleProgram Information(Guid profileId, Guid saleProgramId);
    Pagination<SaleProgram> List(
        Guid profileId,
        QueryOptions queryOptions
    );
    string Remove(Guid profileId, Guid saleProgramId);
}
