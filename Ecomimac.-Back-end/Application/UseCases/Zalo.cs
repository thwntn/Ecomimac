namespace ReferenceService;

public class ZaloCredentialService(
    IZaloCredentialRepository zaloRepository,
    IRequest requestService
) : IZaloCredential
{
    private readonly IZaloCredentialRepository _zaloRepository = zaloRepository;
    private readonly IRequest _requestService = requestService;

    public IEnumerable<ZaloCredential> List(Guid profileId)
    {
        IEnumerable<ZaloCredential> zalo = _zaloRepository.GetByCondition(
            zalo => zalo.ProfileId == profileId
        );
        return zalo;
    }

    public ZaloCredential Create(
        Guid profileId,
        ZaloCredentialDataTransformerObject.Create create
    )
    {
        ZaloCredential zalo = Mapper.Map<ZaloCredential>(create);
        zalo.ProfileId = profileId;

        _zaloRepository.Create(zalo);
        return zalo;
    }

    public ZaloCredential Update(
        Guid profileId,
        ZaloCredentialDataTransformerObject.Update update
    )
    {
        ZaloCredential zalo = Information(profileId, update.Id);
        ZaloCredential merge = Mapper.Merge(zalo, update);

        _zaloRepository.Update(merge);
        return zalo;
    }

    public ZaloCredential Information(Guid profileId, Guid zaloId)
    {
        ZaloCredential zalo = _zaloRepository.GetById(zaloId);
        if (profileId.CompareTo(zalo.ProfileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CONFIG_ZALO
            );

        return zalo;
    }

    public string Remove(Guid profileId, Guid zaloId)
    {
        ZaloCredential zalo = Information(profileId, zaloId);
        string message = _zaloRepository.Remove(zalo);
        return message;
    }
}
