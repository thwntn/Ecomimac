namespace ReferenceRepository;

public class ProfileRepository(DatabaseContext databaseContext)
    : Repository<Profile>(databaseContext),
        IProfileRepository { }
