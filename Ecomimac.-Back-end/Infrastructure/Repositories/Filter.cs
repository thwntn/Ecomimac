namespace ReferenceRepository;

public class FilterRepository(DatabaseContext databaseContext)
    : Repository<Filter>(databaseContext),
        IFilterRepository { }
