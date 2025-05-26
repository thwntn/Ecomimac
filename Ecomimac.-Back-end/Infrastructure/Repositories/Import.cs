namespace ReferenceRepository;

public class ImportRepository(DatabaseContext databaseContext)
    : Repository<Import>(databaseContext),
        IImportRepository { }
