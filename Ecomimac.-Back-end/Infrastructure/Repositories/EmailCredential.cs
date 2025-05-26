namespace ReferenceRepository;

public class MailCredentialRepository(DatabaseContext databaseContext)
    : Repository<MailCredential>(databaseContext),
        IMailCredentialRepository { }
