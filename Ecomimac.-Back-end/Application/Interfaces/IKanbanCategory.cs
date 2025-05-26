namespace ReferenceInterface;

public interface IKabanCategory
{
    public IEnumerable<KabanCategory> List(Guid profileId);
    public KabanCategory Create(
        Guid profileId,
        KabanCategoryDataTransformer.Create create
    );
    public string Remove(Guid profileId, Guid kabanCategoryId);
    KabanCategory Information(Guid profileId, Guid kabanCategoryId);
    public string Update(
        Guid profileId,
        KabanCategoryDataTransformer.Update update
    );
}
