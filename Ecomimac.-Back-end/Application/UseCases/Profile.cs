using ReferenceRepository;

namespace ReferenceService;

public class ProfileService(
    DatabaseContext databaseContext,
    IJwt jwtService,
    IProfileRepository profileRepository
) : IProfile
{
    private readonly IProfileRepository _profileRepository = profileRepository;
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;

    public IEnumerable<Profile> List()
    {
        Logger.Json(_profileRepository.GetById(Guid.Empty));
        IEnumerable<Profile> profiles = _databaseContext.Profile.AsEnumerable();
        return profiles;
    }

    public Account Info()
    {
        Account account = _jwtService.Account();
        return account;
    }

    public Account GetAccountWithRole(Guid accountId)
    {
        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .Include(account => account.RoleAccounts)
                .ThenInclude(roleAccount => roleAccount.Role)
                .FirstOrDefault(account => account.Id == accountId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        return account;
    }

    public Account Update(ProfileDataTransformer.Update update)
    {
        Account account = _jwtService.Account();
        account.Profile = Mapper.Merge(account.Profile, update);

        _databaseContext.Update(account);
        account.Token = _jwtService.GenerateToken(
            account.Profile.Id,
            account.Id,
            Guid.Empty
        );

        _databaseContext.Update(account);
        _databaseContext.SaveChanges();
        return account;
    }

    public async Task<Account> ChangeAvatar(IFormFile file)
    {
        Account account = _jwtService.Account();

        ReaderObject.Blob blob = await Reader.Save(file, string.Empty);
        account.Profile.Avatar = Reader.CreateURL(blob.Path);

        Account info = Mapper.Map<Account>(account);
        info.Token = _jwtService.GenerateToken(
            account.Profile.Id,
            account.Id,
            Guid.Empty
        );

        _databaseContext.Update(account);
        _databaseContext.SaveChanges();

        return info;
    }

    public async Task<Account> ChangeCoverPicture(IFormFile file)
    {
        Account account = _jwtService.Account();

        ReaderObject.Blob blob = await Reader.Save(file, string.Empty);
        account.Profile.CoverPicture = Reader.CreateURL(blob.Path);

        Account info = Mapper.Map<Account>(account);
        info.Token = _jwtService.GenerateToken(
            account.Profile.Id,
            account.Id,
            Guid.Empty
        );

        _databaseContext.Update(account);
        _databaseContext.SaveChanges();

        return info;
    }
}
