namespace ReferenceInterface;

public interface IUpdateContent
{
    Content Execute(Guid profileId, ContentDataTransformerObject.Update update);
}
