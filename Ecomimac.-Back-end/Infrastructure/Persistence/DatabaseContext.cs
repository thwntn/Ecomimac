namespace ReferenceDatabase;

public class DatabaseContext(DbContextOptions<DatabaseContext> options)
    : DbContext(options)
{
    public DbSet<Account> Account { get; set; }
    public DbSet<Role> Role { get; set; }
    public DbSet<RoleAccount> RoleAccount { get; set; }
    public DbSet<LoginAccount> LoginAccount { get; set; }
    public DbSet<Profile> Profile { get; set; }
    public DbSet<Activity> Activity { get; set; }
    public DbSet<Notification> Notification { get; set; }
    public DbSet<Google> Google { get; set; }
    public DbSet<Storage> Storage { get; set; }
    public DbSet<Group> Group { get; set; }
    public DbSet<GroupMember> GroupMember { get; set; }
    public DbSet<Plan> Plan { get; set; }
    public DbSet<Fund> Fund { get; set; }
    public DbSet<Cash> Cash { get; set; }
    public DbSet<KabanCategory> KabanCategory { get; set; }
    public DbSet<Kaban> Kaban { get; set; }
    public DbSet<CashDescription> CashDescription { get; set; }
    public DbSet<ExpenseCategory> ExpenseCategory { get; set; }
    public DbSet<ExpenseCategoryTag> ExpenseCategoryTag { get; set; }
    public DbSet<Expense> Expense { get; set; }
    public DbSet<ExpenseTransaction> ExpenseTransaction { get; set; }
    public DbSet<Note> Note { get; set; }
    public DbSet<Product> Product { get; set; }
    public DbSet<ProductTag> ProductTag { get; set; }
    public DbSet<Invoice> Invoice { get; set; }
    public DbSet<Transaction> Transaction { get; set; }
    public DbSet<Tag> Tag { get; set; }
    public DbSet<Customer> Customer { get; set; }
    public DbSet<CustomerTag> CustomerTag { get; set; }
    public DbSet<InvoiceProduct> InvoiceProduct { get; set; }
    public DbSet<ImageProduct> ImageProduct { get; set; }
    public DbSet<InvoiceDiscount> InvoiceDiscount { get; set; }
    public DbSet<Discount> Discount { get; set; }
    public DbSet<DiscountTag> DiscountTag { get; set; }
    public DbSet<Setting> Setting { get; set; }
    public DbSet<Icon> Icon { get; set; }
    public DbSet<Promotion> Promotion { get; set; }
    public DbSet<PromotionTag> PromotionTag { get; set; }
    public DbSet<PromotionProduct> PromotionProduct { get; set; }
    public DbSet<SaleProgram> SaleProgram { get; set; }
    public DbSet<SaleProgramDiscount> SaleProgramDiscount { get; set; }
    public DbSet<SaleProgramProduct> SaleProgramProduct { get; set; }
    public DbSet<SaleProgramPromotion> SaleProgramPromotion { get; set; }

    //
    //  Summary:
    //      Marketing table feature
    //
    //  Returns:
    //
    public DbSet<Broadcast> Broadcast { get; set; }
    public DbSet<ZaloCredential> ZaloCredential { get; set; }
    public DbSet<MailCredential> MailCredential { get; set; }
    public DbSet<Content> Content { get; set; }
    public DbSet<History> History { get; set; }

    //  Summary:
    //      Import data
    //
    public DbSet<Data> Data { get; set; }
    public DbSet<Import> Import { get; set; }
    public DbSet<Filter> Filters { get; set; }

    //  Summary:
    //      Open API, integration with another system
    //
    public DbSet<OpenIntegrateSession> OpenIntegrateSession { get; set; }
}
