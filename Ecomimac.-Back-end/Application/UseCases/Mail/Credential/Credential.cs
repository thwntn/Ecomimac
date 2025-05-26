namespace ReferenceService;

public class MailCredentialService(
    IMailCredentialRepository mailRepository,
    IRealtimeCredentialMail realtimeCredentialMail,
    ICache cache
) : IMailCredential
{
    private readonly IMailCredentialRepository _mailRepository = mailRepository;
    private readonly IRealtimeCredentialMail _realtimeCredentialMail =
        realtimeCredentialMail;
    private readonly ICache _cache = cache;

    public IEnumerable<MailCredential> List(Guid profileId)
    {
        IEnumerable<MailCredential> email = _mailRepository
            .Include(mailCredential => mailCredential.Profile)
            .Where(email =>
                email.ProfileId == profileId && email.Deleted == null
            );
        return email;
    }

    public MailCredential Create(
        Guid profileId,
        MailCredentialDataTransformerObject.Create create
    )
    {
        MailCredential email = Mapper.Map<MailCredential>(create);
        email.ProfileId = profileId;

        _mailRepository.Create(email);
        _realtimeCredentialMail.Execute(profileId);
        return email;
    }

    public MailCredential Update(
        Guid profileId,
        MailCredentialDataTransformerObject.Update update
    )
    {
        MailCredential email = Information(profileId, update.Id);
        MailCredential merge = Mapper.Merge(email, update);

        _mailRepository.Update(merge);
        _realtimeCredentialMail.Execute(profileId);
        return email;
    }

    public MailCredential Information(Guid profileId, Guid mailCredentialId)
    {
        string nameCache = nameof(MailCredential) + mailCredentialId;
        MailCredential mailCredential = _cache.Cache(
            nameCache,
            () => _mailRepository.GetById(mailCredentialId)
        );

        if (profileId.CompareTo(mailCredential.ProfileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CONFIG_EMAIL
            );

        return mailCredential;
    }

    public string Remove(Guid profileId, Guid mailCredentialId)
    {
        MailCredential email = Information(profileId, mailCredentialId);
        string message = _mailRepository.SoftRemove(email, profileId);
        _realtimeCredentialMail.Execute(profileId);
        return message;
    }
}
