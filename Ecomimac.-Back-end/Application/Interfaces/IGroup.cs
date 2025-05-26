namespace ReferenceService;

public interface IGroup
{
    Group Info(Guid groupId);
    Group Create(string groupName);
    IEnumerable<Group> List();
    Task<Group> ChangeImage(Guid groupId, IFormFile file);
    Group Update(Group record);
    Group Rename(GroupDataTransformer.Rename rename);
    bool Remove(Guid groupId);
    IEnumerable<GroupMember> InviteMember(
        GroupDataTransformer.ModifyMember modifyMember
    );
    string RemoveMember(GroupDataTransformer.ModifyMember modifyMember);
    IEnumerable<MStorage.StorageWithCounter> ListStorage(Guid groupId);
    IEnumerable<Storage> ListDestination(Guid groupId, Guid storageId);
    string AcceptInvite(Guid groupId);
    IEnumerable<Group> ListRequest();
}
