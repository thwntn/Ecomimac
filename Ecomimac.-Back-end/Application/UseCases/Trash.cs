namespace ReferenceService;

public class TrashService(DatabaseContext databaseContext, IJwt jwtService) : ITrash
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;

    public IEnumerable<Storage> List()
    {
        Profile profile =
            _databaseContext
                .Profile.Include(profile => profile.Storages)
                .FirstOrDefault(profile => profile.Id == _jwtService.Information().ProfileId)
            ?? throw new HttpException(HttpStatus.BadRequest, MessageConstant.NOT_FOUND_ACCOUNT);

        IEnumerable<Storage> storages = profile.Storages.Where(storage => storage.Status == StorageStatus.Trash);
        return storages;
    }

    public Storage Add(Guid storageId)
    {
        Storage storage =
            _databaseContext.Storage.FirstOrDefault(storage =>
                storage.Id == storageId && storage.ProfileId == _jwtService.Information().ProfileId
            ) ?? throw new HttpException(HttpStatus.BadRequest, MessageConstant.NOT_FOUND_STORAGE);

        storage.Status = StorageStatus.Trash;
        _databaseContext.Storage.Update(storage);
        _databaseContext.SaveChanges();

        return storage;
    }

    public Storage Restore(Guid storageId)
    {
        Storage storage =
            _databaseContext.Storage.FirstOrDefault(storage =>
                storage.Id == storageId && storage.ProfileId == _jwtService.Information().ProfileId
            ) ?? throw new HttpException(HttpStatus.BadRequest, MessageConstant.NOT_FOUND_STORAGE);

        storage.Status = StorageStatus.Normal;
        _databaseContext.Update(storage);
        _databaseContext.SaveChanges();

        return storage;
    }

    public string Remove(Guid storageId)
    {
        Storage storage =
            _databaseContext.Storage.FirstOrDefault(storage =>
                storage.Id == storageId && storage.ProfileId == _jwtService.Information().ProfileId
            ) ?? throw new HttpException(HttpStatus.BadRequest, MessageConstant.NOT_FOUND_STORAGE);

        _databaseContext.Remove(storage);
        _databaseContext.SaveChanges();

        return string.Empty;
    }
}
