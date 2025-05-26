namespace ReferenceRepository;

public class SaleProgramRepository(DatabaseContext databaseContext)
    : Repository<SaleProgram>(databaseContext),
        ISaleProgramRepository { }
