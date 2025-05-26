namespace ReferenceRepository;

public class ContentRepository(DatabaseContext databaseContext)
    : Repository<Content>(databaseContext),
        IContentRepository { }
