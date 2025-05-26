namespace ReferenceRepository;

public class CustomerRepository(DatabaseContext databaseContext)
    : Repository<Customer>(databaseContext),
        ICustomerRepository { }
