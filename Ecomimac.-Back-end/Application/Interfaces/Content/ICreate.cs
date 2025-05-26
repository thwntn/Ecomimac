namespace ReferenceInterface;

public interface ICreateContent
{
    Content Execute(Guid profileId, ContentDataTransformerObject.Create create);
}
