namespace ReferenceService;

public class GroupService(
    DatabaseContext databaseContext,
    IConnectionHub connectionHubService,
    IStorage storageService,
    INotification notificationService,
    IJwt jwtService
) : IGroup
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;
    private readonly IStorage _storageService = storageService;
    private readonly INotification _notificationService = notificationService;
    private readonly IJwt _jwtService = jwtService;

    public Group Info(Guid groupId)
    {
        Group group =
            _databaseContext
                .Group.Include(group => group.Profile)
                .Include(group => group.Members)
                .ThenInclude(member => member.Profile)
                .Include(group => group.Storages)
                .FirstOrDefault(group => group.Id == groupId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_GROUP
            );

        return group;
    }

    public async Task<Group> ChangeImage(Guid groupId, IFormFile file)
    {
        ReaderObject.Blob blob = await Reader.Save(file, string.Empty);
        string url = Reader.CreateURL(blob.FileName);

        Group group =
            Info(groupId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_GROUP
            );
        group.Image = url;

        _databaseContext.Update(group);
        _databaseContext.SaveChanges();
        return group;
    }

    public Group Create(string groupName)
    {
        Group group = new()
        {
            ProfileId = _jwtService.Information().ProfileId,
            Image = Reader.CreateURL(Constant.GROUP_IMAGE),
            Name = groupName,
        };
        _databaseContext.Add(group);
        _databaseContext.SaveChanges();
        RealtimeUpdate();
        return group;
    }

    public IEnumerable<Group> List()
    {
        IEnumerable<Group> groups = _databaseContext
            .Group.Include(group => group.Storages)
            .Include(group => group.Members)
            .ThenInclude(members => members.Profile)
            .Include(group => group.Profile)
            .Where(group =>
                group.ProfileId == _jwtService.Information().ProfileId
                || group.Members.Any(member =>
                    member.ProfileId == _jwtService.Information().ProfileId
                    && member.Status == GroupInviteStatus.Accept
                )
            );

        foreach (Group group in groups)
            group.Members = group
                .Members.Where(member =>
                    member.Status == GroupInviteStatus.Accept
                )
                .ToList();

        return groups;
    }

    public Group Update(Group record)
    {
        Group group =
            _databaseContext.Group.FirstOrDefault(item =>
                (
                    item.ProfileId == _jwtService.Information().ProfileId
                    || item.Members.Any(item =>
                        item.ProfileId == _jwtService.Information().ProfileId
                    )
                )
                && item.Id == record.Id
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_GROUP
            );

        _databaseContext.Group.Update(record);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return group;
    }

    public Group Rename(GroupDataTransformer.Rename rename)
    {
        Group group =
            _databaseContext.Group.FirstOrDefault(item =>
                item.ProfileId == _jwtService.Information().ProfileId
                && item.Id == rename.GroupId
            )
            ?? throw new HttpException(
                HttpStatus.Forbidden,
                MessageConstant.NOT_ACCEPT_ROLE
            );

        group.Name = rename.Name;
        _databaseContext.Group.Update(group);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return group;
    }

    public bool Remove(Guid groupId)
    {
        _databaseContext.Storage.RemoveRange(
            _databaseContext.Storage.Where(storage =>
                storage.GroupId == groupId
            )
        );
        Group group =
            _databaseContext.Group.FirstOrDefault(group => group.Id == groupId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_GROUP
            );

        _databaseContext.Remove(group);
        _databaseContext.SaveChanges();
        RealtimeUpdate();
        return true;
    }

    public async Task<Storage> Upload(
        FormFile file,
        Guid storageId,
        Guid groupId
    )
    {
        Storage storage = await _storageService.Upload(file, storageId);
        storage.GroupId = groupId;
        _databaseContext.Update(storage);
        _databaseContext.SaveChanges();
        return storage;
    }

    public string RemoveStorage(Guid storageId)
    {
        string message = _storageService.Remove(storageId);
        return message;
    }

    public IEnumerable<GroupMember> InviteMember(
        GroupDataTransformer.ModifyMember modifyMember
    )
    {
        Group group =
            _databaseContext.Group.FirstOrDefault(item =>
                (item.ProfileId == _jwtService.Information().ProfileId)
                && item.Id == modifyMember.GroupId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_GROUP
            );

        IQueryable<Profile> members = _databaseContext.Profile.Where(user =>
            modifyMember.Emails.Any(email => user.Email == email)
        );

        if (members.Any() == false)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );
        ;

        IEnumerable<GroupMember> groupMembers = members.Select(
            item => new GroupMember
            {
                Status = GroupInviteStatus.Invited,
                GroupId = modifyMember.GroupId,
                ProfileId = item.Id,
            }
        );

        _databaseContext.AddRange(groupMembers);
        _databaseContext.SaveChanges();

        foreach (Profile item in members)
            _notificationService.Add(
                item.Id,
                _jwtService.Information().ProfileId,
                NotificationNames.INVITE_TO_GROUP,
                group
            );

        RealtimeUpdate();
        return groupMembers;
    }

    public string RemoveMember(GroupDataTransformer.ModifyMember modifyMember)
    {
        IQueryable<GroupMember> members = _databaseContext.GroupMember.Where(
            member =>
                modifyMember.Emails.Any(item => member.Profile.Email == item)
                && member.GroupId == modifyMember.GroupId
        );

        _databaseContext.RemoveRange(members);
        _databaseContext.SaveChanges();

        RealtimeUpdate();
        return string.Empty;
    }

    public IEnumerable<MStorage.StorageWithCounter> ListStorage(Guid groupId)
    {
        IEnumerable<Storage> storages = _databaseContext
            .Storage.Where(storage =>
                storage.GroupId == groupId
                && storage.Status == StorageStatus.Normal
            )
            .OrderByDescending(storage => storage.Created);

        IEnumerable<MStorage.StorageWithCounter> result =
            _storageService.FolderCounter(storages);

        return result;
    }

    public IEnumerable<Storage> ListDestination(Guid groupId, Guid storageId)
    {
        IQueryable<Storage> folders = _databaseContext.Storage.Where(storage =>
            storage.GroupId == groupId
            && storage.Type == StorageNames.Folder
            && storage.Status == StorageStatus.Normal
        );

        IEnumerable<Guid> children = _storageService.RecursiveChildren(
            [storageId]
        );
        IEnumerable<Storage> storageHandler = folders.Where(storage =>
            children.Any(item => storage.Id == item) == false
        );

        return storageHandler;
    }

    public string AcceptInvite(Guid groupId)
    {
        Group group =
            _databaseContext
                .Group.Include(group => group.Members)
                .FirstOrDefault(group => group.Id == groupId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_GROUP
            );

        GroupMember member =
            group.Members.FirstOrDefault(member =>
                member.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        if (member.Status is GroupInviteStatus.Accept)
            return MessageConstant.REQUEST_ACCEPTED;
        else
            member.Status = GroupInviteStatus.Accept;

        _databaseContext.Group.Update(group);
        _databaseContext.SaveChanges();
        RealtimeUpdate();
        return MessageConstant.REQUEST_SUCCESS;
    }

    public IEnumerable<Group> ListRequest()
    {
        IQueryable<Group> groups = _databaseContext
            .GroupMember.Include(groupMember => groupMember.Group)
            .ThenInclude(group => group.Profile)
            .Where(groupMember =>
                groupMember.ProfileId == _jwtService.Information().ProfileId
                && groupMember.Status == GroupInviteStatus.Invited
            )
            .Select(item => item.Group);

        return groups;
    }

    private void RealtimeUpdate() =>
        _connectionHubService.Invoke(nameof(HubMethodName.UPDATE_GROUP), null);
}
