namespace ReferenceInterface;

public interface IRole
{
    void Sync();
    IEnumerable<Role> List();
    IEnumerable<RoleAccount> RoleAccount();
    RoleAccount AssignRole(RoleDatabaseTransformer.AssignRole assignRole);
    string UnassignRole(RoleDatabaseTransformer.UnassignRole unassignRole);
    IEnumerable<RoleAccount> MakeAdminAccount(Guid accountId);
    bool CheckRoles(
        IEnumerable<RoleAccount> roleAccounts,
        IEnumerable<string> roleConstants
    );
}
