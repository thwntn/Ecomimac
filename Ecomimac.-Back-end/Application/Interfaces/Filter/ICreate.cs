namespace ReferenceInterface;

public interface ICreateFilter
{
    Filter Execute(Guid profileId, FilterDataTransformer.Create create);
}
