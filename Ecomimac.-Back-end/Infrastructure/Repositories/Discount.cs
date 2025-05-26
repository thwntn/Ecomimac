namespace ReferenceRepository;

public class DiscountRepository(DatabaseContext databaseContext)
    : Repository<Discount>(databaseContext),
        IDiscountRepository { }
