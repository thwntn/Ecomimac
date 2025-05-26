namespace ReferenceInterface;

public interface IExtra
{
    Account Create(ExtraDataTransformer.Create create);
    Account Signin(ExtraDataTransformer.Signin signin);
    Pagination<Account> List(Guid profileId, QueryOptions queryOptions);
    Account Switch(Guid profileId, ExtraDataTransformer.Switch switchAccount);
    Account LockOrOpen(Guid accountId, ExtraDataTransformer.Lock lockAccount);
}
