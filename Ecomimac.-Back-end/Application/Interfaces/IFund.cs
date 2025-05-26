namespace ReferenceInterface;

public interface IFund
{
    IEnumerable<Fund> List();
    Fund Create(FundDataTransformer.Create create);
    Fund Info(Guid fundId);
    string Remove(Guid fundId);
}
