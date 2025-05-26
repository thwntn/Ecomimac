namespace ReferenceInterface;

public interface ITag
{
    Pagination<Tag> List(Guid profileId, QueryOptions queryOptions);
    public Tag Information(Guid profileId, Guid tagId);
    public Tag Create(Guid profileId, TagDataTransformerObject.Create create);
    public Tag Update(Guid profileId, TagDataTransformerObject.Update update);
    public string Remove(Guid profileId, Guid tagId);
}
