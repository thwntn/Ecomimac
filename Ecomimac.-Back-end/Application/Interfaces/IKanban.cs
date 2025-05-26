namespace ReferenceInterface;

public interface IKaban
{
    public IEnumerable<Kaban> List(Guid profileId);
    public Kaban Create(Guid profileId, KabanDataTransformer.Create create);
    public string Remove(Guid profileId, Guid kabanId);
    public Kaban Move(Guid profileId, KabanDataTransformer.Move move);
    public string Update(Guid profileId, KabanDataTransformer.Update update);
    Task<Kaban> Image(Guid profileId, Guid kabanId, IFormFile file);
}
