namespace ReferenceRepository;

public class PromotionRepository(DatabaseContext databaseContext)
    : Repository<Promotion>(databaseContext),
        IPromotionRepository { }
