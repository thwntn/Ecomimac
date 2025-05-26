namespace ReferenceInterface;

public interface IStorage
{
    Storage CreateFolder(
        StorageDataTransformer.CreateFolder createFolder,
        Guid storageId
    );
    Storage Rename(Guid storageId, StorageDataTransformer.Rename rename);
    Task<Storage> Upload(IFormFile file, Guid storageId);
    IEnumerable<MStorage.StorageWithCounter> List(Guid storageId);
    IEnumerable<MStorage.StorageWithCounter> FolderCounter(
        IEnumerable<Storage> storages
    );
    IEnumerable<Storage> Recent();
    Storage Update(Storage storage);
    string Remove(Guid storageId);
    MHome.Info Home();
    IEnumerable<Storage> Search(string content);
    Storage Move(StorageDataTransformer.Move move);
    IEnumerable<Guid> RecursiveChildren(List<Guid> storages);
    IEnumerable<MStorage.StorageWithLevel> Redirect(Guid storageId);
    IEnumerable<Storage> ListDestination(Guid storageId);
    IEnumerable<Storage> Folders();
}
