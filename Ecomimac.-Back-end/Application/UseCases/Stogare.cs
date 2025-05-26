namespace ReferenceService;

public class StorageService(
    DatabaseContext databaseContext,
    IConnectionHub connectionHubService,
    ITrash trashService,
    IJwt jwtService
) : IStorage
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IConnectionHub _connectionHubService = connectionHubService;
    private readonly IJwt _jwtService = jwtService;
    private readonly ITrash _trashService = trashService;
    private readonly long _sizeStorage = long.Parse(
        Environment.GetEnvironmentVariable(nameof(EnvironmentNames.SizeStorage))
    );

    public Storage CreateFolder(
        StorageDataTransformer.CreateFolder createFolder,
        Guid storageId
    )
    {
        Storage storage =
            new()
            {
                Created = Timebase.Now(),
                ProfileId = _jwtService.Information().ProfileId,
                DisplayName = createFolder.Name,
                Url = string.Empty,
                MapName = string.Empty,
                Type = StorageNames.Folder,
                Status = StorageStatus.Normal,
                Parent = storageId,
                Thumbnail = string.Empty,
                Size = 0,
            };

        if (createFolder.GroupId == Guid.Empty)
            storage.GroupId = createFolder.GroupId;

        _databaseContext.Add(storage);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return storage;
    }

    public IEnumerable<Storage> Folders()
    {
        IQueryable<Storage> storages = _databaseContext.Storage.Where(storage =>
            storage.Type == StorageNames.Folder
            && storage.Status == StorageStatus.Normal
            && storage.ProfileId == _jwtService.Information().ProfileId
        );
        return storages;
    }

    public Storage Rename(Guid storageId, StorageDataTransformer.Rename rename)
    {
        Storage storage =
            _databaseContext.Storage.FirstOrDefault(storage =>
                storage.Id == storageId
                && storage.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_STORAGE
            );

        storage.DisplayName = rename.Name;
        _databaseContext.Update(storage);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return storage;
    }

    public async Task<Storage> Upload(IFormFile file, Guid storageId)
    {
        bool permission = ValidPermission(
            _jwtService.Information().ProfileId,
            storageId
        );
        if (permission is false)
            throw new HttpException(
                HttpStatus.Forbidden,
                MessageConstant.NOT_ACCEPT_ROLE
            );

        ReaderObject.Blob size = Reader.GetSize(file);
        long sizeUsage = SizeUsage();
        if (size.Size + sizeUsage >= _sizeStorage)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.FULL_SPACE
            );

        ReaderObject.Blob save = await Reader.Save(file, string.Empty);
        string thumbnail = null;
        if (Constant.TYPE_PICTURE.Any(type => save.FileName.Contains(type)))
            thumbnail = Reader.Thumbnail(Reader.ReadFile(save.FileName), 10);

        Storage storage =
            new()
            {
                MapName = save.FileName,
                Created = Timebase.Now(),
                DisplayName = save.Key,
                Url = Reader.CreateURL(save.Path),
                Parent = storageId,
                Type = StorageNames.File,
                Status = StorageStatus.Normal,
                Size = save.Size,
                ProfileId = _jwtService.Information().ProfileId,
                Thumbnail = Reader.CreateURL(thumbnail),
            };

        _databaseContext.Add(storage);
        _databaseContext.SaveChanges();
        RealtimeUpdate();
        return storage;
    }

    private long SizeUsage()
    {
        Profile user = _databaseContext
            .Profile.Include(user => user.Storages)
            .Include(user => user.Groups)
            .ThenInclude(group => group.Storages)
            .FirstOrDefault(user =>
                user.Id == _jwtService.Information().ProfileId
            );

        IEnumerable<Storage> storageUser = user.Storages.Where(storage =>
            user.Groups.Any(group =>
                group.Storages.Any(dataGroup => dataGroup.Id == storage.Id)
            )
                is false
        );
        long storageSize = storageUser.Sum(storage => storage.Size);
        long groupSize = user.Groups.Sum(group =>
            group.Storages.Sum(dataGroup => dataGroup.Size)
        );

        long size = groupSize + storageSize;
        return size;
    }

    public IEnumerable<MStorage.StorageWithCounter> List(Guid storageId)
    {
        IQueryable<Storage> storages = _databaseContext.Storage.Where(storage =>
            storage.ProfileId == _jwtService.Information().ProfileId
            && storage.GroupId.Equals(null)
            && storage.Status == StorageStatus.Normal
            && storage.Parent == storageId
        );
        IEnumerable<MStorage.StorageWithCounter> result = FolderCounter(
                [.. storages]
            )
            .OrderByDescending(storage => storage.Created);
        return result;
    }

    public IEnumerable<MStorage.StorageWithCounter> FolderCounter(
        IEnumerable<Storage> storages
    )
    {
        List<Storage> folders = [],
            files = [];

        foreach (Storage item in storages)
        {
            if (item.Type == StorageNames.Folder)
                folders.Add(item);
            else if (item.Type == StorageNames.File)
                files.Add(item);
        }

        IEnumerable<IGrouping<Guid, Storage>> counter = _databaseContext
            .Storage.ToList()
            .Where(storage =>
                storage.Status == StorageStatus.Normal
                && folders.Any(item => item.Id == storage.Parent)
            )
            .GroupBy(item => item.Parent);

        IEnumerable<Counter<Guid>> count = counter.Select(
            item => new Counter<Guid>(
                item.Key,
                item.Count(),
                item.Sum(storage => storage.Size)
            )
        );
        List<MStorage.StorageWithCounter> folderWithCount = Mapper.Map<
            List<MStorage.StorageWithCounter>
        >(folders);
        foreach (MStorage.StorageWithCounter item in folderWithCount)
        {
            Counter<Guid> find = count.FirstOrDefault(count =>
                count.key == item.Id
            );
            if (find is null)
                continue;

            item.counter = find.count;
            item.counterSize = find.size;
        }

        IEnumerable<MStorage.StorageWithCounter> result = Mapper
            .Map<List<MStorage.StorageWithCounter>>(files)
            .Concat(folderWithCount);

        return result;
    }

    public IEnumerable<Storage> Recent()
    {
        Profile profile =
            _databaseContext
                .Profile.Include(user => user.Storages)
                .FirstOrDefault(user =>
                    user.Id == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        IEnumerable<Storage> filter = profile
            .Storages.Where(item => item.Status == StorageStatus.Normal)
            .OrderByDescending(storage => storage.Created)
            .Take(40);

        return filter;
    }

    public Storage Update(Storage storage)
    {
        bool permission = ValidPermission(
            _jwtService.Information().ProfileId,
            storage.Id
        );
        if (permission is false)
            throw new HttpException(
                HttpStatus.Forbidden,
                MessageConstant.NOT_ACCEPT_ROLE
            );

        _databaseContext.Update(storage);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return storage;
    }

    public string Remove(Guid storageId)
    {
        _trashService.Add(storageId);
        RealtimeUpdate();
        return string.Empty;
    }

    public MHome.Info Home()
    {
        Profile profile =
            _databaseContext
                .Profile.Include(user => user.Storages)
                .FirstOrDefault(user =>
                    user.Id == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        Dictionary<string, MHome.Counter> counter = [];
        foreach (Storage item in profile.Storages)
        {
            bool isMusic = Constant.TYPE_MUSIC.Any(item.MapName.Contains);
            counter.TryAdd(nameof(isMusic), new(nameof(isMusic)));
            if (isMusic)
            {
                MHome.Counter address = counter[nameof(isMusic)];
                address.quantity++;
                address.size += item.Size;
                continue;
            }
            bool isVideo = Constant.TYPE_VIDEO.Any(item.MapName.Contains);
            counter.TryAdd(nameof(isVideo), new(nameof(isVideo)));
            if (isVideo)
            {
                MHome.Counter address = counter[nameof(isVideo)];
                address.quantity++;
                address.size += item.Size;
                continue;
            }
            bool isPicture = Constant.TYPE_PICTURE.Any(item.MapName.Contains);
            counter.TryAdd(nameof(isPicture), new(nameof(isPicture)));
            if (isPicture)
            {
                MHome.Counter address = counter[nameof(isPicture)];
                address.quantity++;
                address.size += item.Size;
                continue;
            }
        }

        int totalFile = profile
            .Storages.Where(storage => storage.Type == StorageNames.File)
            .Count();
        long totalSize = profile.Storages.Select(storage => storage.Size).Sum();

        int isOther;
        int quantityOther =
            totalFile - counter.Values.Select(item => item.quantity).Sum();
        long sizeOther =
            totalSize - counter.Values.Select(item => item.size).Sum();
        counter.Add(
            nameof(isOther),
            new(nameof(isOther))
            {
                quantity = quantityOther,
                size = totalSize - sizeOther,
            }
        );

        foreach (var item in counter.Values)
            item.percent = Convert.ToInt64(
                item.size / Convert.ToDouble(_sizeStorage) * 100
            );

        return new MHome.Info(
            totalSize,
            totalFile,
            [.. counter.Values],
            new(_sizeStorage)
        );
    }

    public IEnumerable<Storage> Search(string content)
    {
        Profile profile =
            _databaseContext
                .Profile.Include(profile => profile.Storages)
                .FirstOrDefault(profile =>
                    profile.Id == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        IEnumerable<Storage> storages = profile.Storages.Where(storage =>
            storage.DisplayName.Contains(content)
            && storage.Status == StorageStatus.Normal
        );
        return storages;
    }

    public Storage Move(StorageDataTransformer.Move move)
    {
        Profile profile =
            _databaseContext
                .Profile.Include(user => user.Storages)
                .FirstOrDefault(user =>
                    user.Id == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        Storage from = profile.Storages.FirstOrDefault(item =>
            item.Id == move.StorageId
        );
        if (move.StorageId == move.DestinationId)
            throw new HttpException(
                HttpStatus.Forbidden,
                MessageConstant.NOT_ACCEPT_ROLE
            );

        from.Parent = move.DestinationId;

        _databaseContext.Update(from);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return from;
    }

    public IEnumerable<Guid> RecursiveChildren(List<Guid> storages)
    {
        if (storages.Count is 0)
            return [];

        IQueryable<Guid> storage = _databaseContext
            .Storage.Where(storage =>
                storages.Any(item => item == storage.Parent)
            )
            .Select(item => item.Id);

        return [.. storages.Concat(RecursiveChildren([.. storage]))];
    }

    private List<Guid> RecursiveDirectory(Guid parentId, List<Guid> result)
    {
        if (parentId == Guid.Empty)
            return result;
        else
        {
            Storage storage = _databaseContext.Storage.FirstOrDefault(storage =>
                storage.Id == parentId
            );
            result.Add(storage.Id);
            return RecursiveDirectory(storage.Parent, result);
        }
    }

    public IEnumerable<MStorage.StorageWithLevel> Redirect(Guid storageId)
    {
        List<Guid> result = [];
        _ = RecursiveDirectory(storageId, result);
        result.Reverse();

        List<MStorage.StorageWithLevel> mapperLevel = Mapper.Map<
            List<MStorage.StorageWithLevel>
        >(
            _databaseContext.Storage.Where(storage =>
                result.Any(item => item == storage.Id)
            )
        );

        mapperLevel.ForEach(item => item.level = result.IndexOf(item.Id));
        return mapperLevel;
    }

    public IEnumerable<Storage> ListDestination(Guid storageId)
    {
        Profile profile =
            _databaseContext
                .Profile.Include(user => user.Storages)
                .FirstOrDefault(user =>
                    user.Id == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );
        Storage record =
            profile.Storages.FirstOrDefault(storage => storage.Id == storageId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_STORAGE
            );

        IQueryable<Storage> groupStorage = _databaseContext
            .Group.Include(group => group.Storages)
            .SelectMany(item => item.Storages)
            .Where(storage => storage.Type == StorageNames.Folder);

        IEnumerable<Storage> storages = profile.Storages.Where(storage =>
            storage.Type == StorageNames.Folder
            && storage.Status == StorageStatus.Normal
        );
        IEnumerable<Storage> withoutGroup = storages.Where(storage =>
            groupStorage.Any(item => item.Id == storage.Id) is false
        );

        IEnumerable<Guid> children = RecursiveChildren([storageId]);
        IEnumerable<Storage> withoutChildren = withoutGroup.Where(storage =>
            children.Any(item => storage.Id == item) is false
            && (record.Parent == storage.Id) is false
        );

        return withoutChildren;
    }

    private static bool ValidPermission(Guid profileId, Guid storageId)
    {
        return true;
        // if (storageId is null)
        //     return true;

        // var storage =
        //     _databaseContext.Storage.FirstOrDefault(storage =>
        //         storage.Id == storageId && storage.ProfileId == _jwtService.Information().profileId
        //     ) ?? throw new HttpException(HttpStatus.BadRequest, MessageConstant.NOT_FOUND_STORAGE);

        // if (storage.GroupId is not null)
        // {
        //     var group =
        //         _databaseContext.Group.FirstOrDefault(group => group.Id == storage.GroupId)
        //         ?? throw new HttpException(HttpStatus.BadRequest, MessageConstant.NOT_FOUND_GROUP);

        //     bool inGroup = group.Members.Any(member => member.ProfileId == _jwtService.Information().profileId) || group.ProfileId == _jwtService.Information().profileId;
        //     return inGroup;
        // }
        // return false;
    }

    private void RealtimeUpdate() =>
        _connectionHubService.Invoke(nameof(HubMethodName.UPDATE_LIST_FILE), null);
}
