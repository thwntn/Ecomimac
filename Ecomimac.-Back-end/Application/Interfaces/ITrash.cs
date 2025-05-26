namespace ReferenceService;

public interface ITrash
{
    public IEnumerable<Storage> List();
    public Storage Add(Guid storageId);
    public Storage Restore(Guid storageId);
    public string Remove(Guid storageId);
}
