namespace ReferenceModel;

public class AuthObject
{
    public class SigninWithPasswordResponse
    {
        [NotMapped]
        public string Token { get; set; }

        [NotMapped]
        public string Created { get; set; }

        [NotMapped]
        public string UserName { get; set; }

        [NotMapped]
        public string Code { get; set; }

        [NotMapped]
        public AccountStatus AccountStatus { get; set; }

        [NotMapped]
        public AccountNames AccountType { get; set; }

        [NotMapped]
        public ProfileResponse Profile { get; set; }

        [NotMapped]
        public List<RoleAccountObject.RoleAccountResponse> RoleAccounts { get; set; }
    }

    public class ProfileResponse
    {
        [NotMapped]
        public string Id { get; set; }

        [NotMapped]
        public string Name { get; set; }

        [NotMapped]
        public string Avatar { get; set; }

        [NotMapped]
        public string Birthday { get; set; }

        [NotMapped]
        public string Description { get; set; }

        [NotMapped]
        public string Email { get; set; }

        [NotMapped]
        public string Phone { get; set; }

        [NotMapped]
        public string CoverPicture { get; set; }

        [NotMapped]
        public string Address { get; set; }

        [NotMapped]
        public DateTime LastLogin { get; set; }
    }
}
