namespace ReferenceRepository;

public class HistoryRepository(DatabaseContext databaseContext)
    : Repository<History>(databaseContext),
        IHistoryRepository { }
