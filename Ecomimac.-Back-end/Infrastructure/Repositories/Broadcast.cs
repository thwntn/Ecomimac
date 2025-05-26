namespace ReferenceRepository;

public class BroadcastRepository(DatabaseContext databaseContext)
    : Repository<Broadcast>(databaseContext),
        IBroadcastRepository { }
