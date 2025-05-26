namespace ReferenceInterface;

public interface ICreateData
{
    Data Execute(Guid profileId, DataTransformerObject.Create create);
}
