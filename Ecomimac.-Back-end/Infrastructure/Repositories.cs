namespace ReferenceFeature;

public class Repositories
{
    public static void Injection(IServiceCollection services)
    {
        services.AddScoped<IProfileRepository, ProfileRepository>();
        services.AddScoped<IExpenseRepository, ExpenseRepository>();
        services.AddScoped<
            IExpenseCategoryRepository,
            ExpenseCategoryRepository
        >();
        services.AddScoped<ISaleProgramRepository, SaleProgramRepository>();
        services.AddScoped<IDiscountRepository, DiscountRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IPromotionRepository, PromotionRepository>();
        services.AddScoped<
            IExpenseTransactionRepository,
            ExpenseTransactionRepository
        >();
        services.AddScoped<IInvoiceRepository, InvoiceRepository>();
        services.AddScoped<ITagRepository, TagRepository>();
        services.AddScoped<ICustomerRepository, CustomerRepository>();

        //
        //  Summary:
        //      Broadcast message
        //
        //  Returns:
        //
        services.AddScoped<IBroadcastRepository, BroadcastRepository>();
        services.AddScoped<
            IMailCredentialRepository,
            MailCredentialRepository
        >();
        services.AddScoped<
            IZaloCredentialRepository,
            ZaloCredentialRepository
        >();
        services.AddScoped<IContentRepository, ContentRepository>();
        services.AddScoped<IHistoryRepository, HistoryRepository>();
        //  Summary:
        //      Broadcast message
        //
        services.AddScoped<IDataRepository, DataRepository>();
        services.AddScoped<IImportRepository, ImportRepository>();
        services.AddScoped<IFilterRepository, FilterRepository>();

        //  Summary:
        //      Api integration session
        //
        services.AddScoped<
            IOpenIntegrateSessionRepository,
            OpenIntegrateSessionRepository
        >();
    }
}
