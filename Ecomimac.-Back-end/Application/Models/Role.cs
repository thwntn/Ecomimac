namespace ReferenceModel;

public class RoleAccountObject
{
    public class RoleAccountResponse
    {
        [NotMapped]
        public RoleResponse Role;
    }

    public class RoleResponse
    {
        [NotMapped]
        public string Id;

        [NotMapped]
        public string Name;

        [NotMapped]
        public string Code;
    }
}
