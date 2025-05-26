namespace ReferenceRepository;

public class InvoiceRepository(DatabaseContext databaseContext)
    : Repository<Invoice>(databaseContext),
        IInvoiceRepository { }
