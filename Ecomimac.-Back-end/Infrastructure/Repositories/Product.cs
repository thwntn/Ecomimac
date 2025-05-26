namespace ReferenceRepository;

public class ProductRepository(DatabaseContext databaseContext)
    : Repository<Product>(databaseContext),
        IProductRepository { }
