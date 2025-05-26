namespace ReferenceRepository;

public class TagRepository(DatabaseContext databaseContext)
    : Repository<Tag>(databaseContext),
        ITagRepository { }
