namespace ReferenceService;

public class ExtraService(DatabaseContext databaseContext, IJwt jwtService)
    : IExtra
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;

    public Account Create(ExtraDataTransformer.Create create)
    {
        Account account =
            _databaseContext.Account.FirstOrDefault(account =>
                account.Profile.Id == _jwtService.Information().ProfileId
                && account.AccountType == AccountNames.Email
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        string hashPassword = Cryptography.Md5(create.Password);
        Profile profile = new(create.Name, create.Email, create.Description);
        LoginAccount accountLogin = new();

        Account subAccount =
            new(
                create.Email,
                hashPassword,
                create.UserName,
                string.Empty,
                AccountStatus.Open,
                AccountNames.SubAccount
            );
        _databaseContext.Add(subAccount);

        subAccount.ParentAccountId = account.Id;
        profile.AccountId = subAccount.Id;
        _databaseContext.Add(profile);

        accountLogin.AccountId = subAccount.Id;
        accountLogin.Created = Timebase.Now();
        _databaseContext.Add(accountLogin);

        _databaseContext.SaveChanges();
        return subAccount;
    }

    public Account Signin(ExtraDataTransformer.Signin signin)
    {
        Account rootAccount =
            _databaseContext.Account.FirstOrDefault(account =>
                account.Email == signin.RootEmail
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        string hashPassword = Cryptography.Md5(signin.Password);
        LoginAccount accountLogin = new();

        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .Include(account => account.RoleAccounts)
                .ThenInclude(roleAccount => roleAccount.Role)
                .FirstOrDefault(account =>
                    account.UserName == signin.UserName
                    && account.HashPassword == hashPassword
                    && account.AccountType == AccountNames.SubAccount
                    && account.ParentAccountId == rootAccount.Id
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        if (account.AccountStatus == AccountStatus.Open)
            account.Token = _jwtService.GenerateToken(
                account.Profile.Id,
                account.Id,
                Guid.Empty
            );

        accountLogin.Created = Timebase.Now();
        accountLogin.AccountId = account.Id;
        _databaseContext.Add(accountLogin);

        _databaseContext.SaveChanges();
        return account;
    }

    public Account Switch(
        Guid accountId,
        ExtraDataTransformer.Switch switchAccount
    )
    {
        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .Include(account => account.RoleAccounts)
                .ThenInclude(roleAccount => roleAccount.Role)
                .FirstOrDefault(account =>
                    account.UserName == switchAccount.UserName
                    && account.AccountType == AccountNames.SubAccount
                    && account.ParentAccountId == accountId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        if (account.AccountStatus == AccountStatus.Open)
            account.Token = _jwtService.GenerateToken(
                account.Profile.Id,
                account.Id,
                Guid.Empty
            );

        return account;
    }

    public Account LockOrOpen(
        Guid accountId,
        ExtraDataTransformer.Lock lockAccount
    )
    {
        Account account =
            _databaseContext
                .Account.Include(account => account.Profile)
                .Include(account => account.RoleAccounts)
                .ThenInclude(roleAccount => roleAccount.Role)
                .FirstOrDefault(account =>
                    account.Id == lockAccount.AccountId
                    && account.AccountType == AccountNames.SubAccount
                    && account.ParentAccountId == accountId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        if (
            account.AccountStatus == AccountStatus.Open
            || account.AccountStatus == AccountStatus.Lock
        )
        {
            account.AccountStatus =
                account.AccountStatus == AccountStatus.Lock
                    ? AccountStatus.Open
                    : AccountStatus.Lock;

            _databaseContext.Update(account);
            _databaseContext.SaveChanges();
        }
        else
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.CANNOT_ACTION
            );

        return account;
    }

    public Pagination<Account> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        Profile profile =
            _databaseContext.Profile.FirstOrDefault(profile =>
                profile.Id == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACCOUNT
            );

        IQueryable<Account> list = _databaseContext
            .Account.Include(account => account.Profile)
            .Include(account => account.LoginAccounts)
            .Include(account => account.RoleAccounts)
            .ThenInclude(roleAccount => roleAccount.Role)
            .Where(account => account.ParentAccountId == profile.AccountId);

        return new(list, queryOptions);
    }
}
