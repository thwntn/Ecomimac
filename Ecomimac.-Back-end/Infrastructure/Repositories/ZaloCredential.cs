namespace ReferenceRepository;

public class ZaloCredentialRepository(DatabaseContext databaseContext)
    : Repository<ZaloCredential>(databaseContext),
        IZaloCredentialRepository { }
