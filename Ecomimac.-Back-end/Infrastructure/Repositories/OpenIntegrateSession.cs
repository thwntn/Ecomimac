namespace ReferenceRepository;

public class OpenIntegrateSessionRepository(DatabaseContext databaseContext)
    : Repository<OpenIntegrateSession>(databaseContext),
        IOpenIntegrateSessionRepository { }
