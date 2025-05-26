namespace ReferenceInterface;

public interface IProfile
{
    Account Info();
    IEnumerable<Profile> List();
    Account Update(ProfileDataTransformer.Update update);
    Task<Account> ChangeAvatar(IFormFile file);
    Task<Account> ChangeCoverPicture(IFormFile file);
    Account GetAccountWithRole(Guid accountId);
}
