namespace ReferenceInterface;

public interface ICashDescription
{
    IEnumerable<CashDescription> List(Guid accountId);
    CashDescription Create(
        Guid cashId,
        CashDescriptionDataTransformer.Create create
    );
    IEnumerable<CashDescription> Recent(Guid profileId);
}
