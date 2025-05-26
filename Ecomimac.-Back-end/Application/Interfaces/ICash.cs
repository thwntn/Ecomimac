namespace ReferenceInterface;

public interface ICash
{
    Cash Create(Guid profileId, Guid fundId, CashDataTransformer.Create create);
    string Remove(Guid profileId, Guid cashId);
}
