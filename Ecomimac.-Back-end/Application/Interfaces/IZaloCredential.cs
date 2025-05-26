namespace ReferenceInterface;

public interface IZaloCredential
{
    IEnumerable<ZaloCredential> List(Guid profileId);
    ZaloCredential Create(
        Guid profileId,
        ZaloCredentialDataTransformerObject.Create create
    );
    ZaloCredential Information(Guid profileId, Guid zaloId);
    ZaloCredential Update(
        Guid profileId,
        ZaloCredentialDataTransformerObject.Update update
    );
    string Remove(Guid profileId, Guid zaloId);
}
