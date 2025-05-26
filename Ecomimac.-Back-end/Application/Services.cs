namespace ReferenceFeature;

public class Services
{
    public static void Injection(IServiceCollection services)
    {
        //
        //  Summary:
        //      Connection to signalr
        //
        //  Returns:
        //
        services.AddScoped<IConnectionHub, ConnectionHub>();

        //
        //  Summary:
        //      Connection to message queue (RabbitMQ)
        //
        //  Returns:
        //
        services.AddScoped<IProducerMessageQueue, ProducerMessageQueue>();
        services.AddScoped<IConsumerMessageQueue, ConsumerMessageQueue>();
        services.AddScoped<IListenMessageQueue, ListenMessageQueue>();
        /// Consumer
        services.AddScoped<IBroadcastConsumer, BroadcastConsumer>();

        //
        //  Summary:
        //      History send message (Email, Zalo)
        //
        //  Returns:
        //
        services.AddScoped<IListHistory, ListHistory>();
        services.AddScoped<ICreateHistory, CreateHistory>();
        services.AddScoped<ICounterHistory, CounterHistory>();
        services.AddScoped<IStatusHistory, StatusHistory>();
        services.AddScoped<ISwitchToSending, SwitchToSending>();
        services.AddScoped<ISyncFromCacheHistory, SyncFromCacheHistory>();

        //
        //  Summary:
        //
        //
        //  Returns:
        //
        services.AddScoped<IRequest, RequestService>();
        services.AddScoped<ICache, CacheService>();
        services.AddScoped<IAuth, AuthService>();
        services.AddScoped<IJwt, JwtService>();
        services.AddScoped<IProfile, ProfileService>();
        services.AddScoped<IActivity, ActivityService>();
        services.AddScoped<IExtra, ExtraService>();
        services.AddScoped<IRole, RoleService>();

        services.AddScoped<IGoogle, GoogleService>();
        services.AddScoped<INotification, NotificationService>();
        services.AddScoped<IGemini, GeminiService>();
        services.AddScoped<IStorage, StorageService>();
        services.AddScoped<IShare, ShareService>();
        services.AddScoped<IGroup, GroupService>();
        services.AddScoped<ITrash, TrashService>();
        services.AddScoped<IPlan, PlanService>();
        services.AddScoped<IExpenseTransaction, ExpenseTransactionService>();
        services.AddScoped<IExpenseCategory, ExpenseCategoryService>();
        services.AddScoped<IExpense, ExpenseService>();
        services.AddScoped<INote, NoteService>();
        services.AddScoped<IInvoice, InvoiceService>();
        services.AddScoped<IStatusInvoice, StatusInvoiceService>();
        services.AddScoped<IProduct, ProductService>();
        services.AddScoped<IPayment, PaymentService>();
        services.AddScoped<ICustomer, CustomerService>();
        services.AddScoped<IPromotion, PromotionService>();
        services.AddScoped<IDiscount, DiscountService>();
        services.AddScoped<IFund, FundService>();
        services.AddScoped<ICash, CashService>();
        services.AddScoped<ICashDescription, CashDescriptionService>();
        services.AddScoped<IDashboard, DashboardService>();
        services.AddScoped<IFaker, FakerService>();
        services.AddScoped<ISetting, SettingService>();
        services.AddScoped<IIcon, IconService>();
        services.AddScoped<IKabanCategory, KabanCategoryService>();
        services.AddScoped<IKaban, KabanService>();
        services.AddScoped<ITransaction, TransactionService>();
        services.AddScoped<ITelegram, TelegramService>();
        services.AddScoped<ISaleProgram, SaleProgramService>();
        services.AddScoped<ITag, TagService>();

        //  Summary:
        //      Mail service (Send, Information, Tracking)
        services.AddScoped<IMail, MailService>();
        services.AddScoped<IRealtimeCredentialMail, RealtimeCredentialMail>();

        //  Summary:
        //      Credential (Zalo, Mail)
        services.AddScoped<IZaloCredential, ZaloCredentialService>();
        services.AddScoped<IMailCredential, MailCredentialService>();

        //  Use case:
        //      Broadcast (Create, Update)
        services.AddScoped<IBroadcast, BroadcastService>();
        services.AddScoped<IActiveBroadcast, ActiveBroadcast>();
        services.AddScoped<IHandleActiveBroadcast, HandleActiveBroadcast>();
        services.AddScoped<IMailSendingBroadcast, MailSendingBroadcast>();
        services.AddScoped<IStopBroadcast, StopBroadcast>();
        services.AddScoped<ICounterBroadcast, CounterBroadcast>();
        services.AddScoped<IRenameBroadcast, RenameBroadcast>();
        services.AddScoped<IRemoveBroadcast, RemoveBroadcast>();
        services.AddScoped<ICloneBroadcast, CloneBroadcast>();
        services.AddScoped<ILoopBroadcast, LoopBroadcast>();
        services.AddScoped<IStatusBroadcast, StatusBroadcast>();
        services.AddScoped<IModeBroadcast, ModeBroadcast>();
        services.AddScoped<
            IUpdateReferenceBroadcast,
            UpdateReferenceBroadcast
        >();

        //
        //  Use case:
        //      Content broadcast (Create, Update)
        //
        //  List:
        //
        services.AddScoped<ICreateContent, CreateContent>();
        services.AddScoped<IRealtimeBroadcast, RealtimeBroadcast>();
        services.AddScoped<IUpdateContent, UpdateContent>();
        services.AddScoped<IListContent, ListContent>();
        services.AddScoped<IInformationContent, InformationContent>();
        services.AddScoped<
            IZaloNotificationServicePreview,
            ZaloNotificationServicePreview
        >();

        //  Use case:
        //      File template system (Get)
        services.AddScoped<IGetTemplate, GetTemplate>();

        //  Use case:
        //      Data & filter (Create, Import)
        services.AddScoped<ICreateData, CreateData>();
        services.AddScoped<IFromCustomer, FromCustomer>();
        services.AddScoped<IFromImport, FromImport>();
        services.AddScoped<IStatusData, StatusData>();
        services.AddScoped<ICounterData, CounterData>();
        services.AddScoped<IImportData, ImportData>();
        services.AddScoped<IRealtimeData, RealtimeData>();
        services.AddScoped<IRemoveData, RemoveData>();
        services.AddScoped<IInformationData, InformationData>();
        services.AddScoped<IListData, ListData>();
        services.AddScoped<IRecordData, RecordData>();

        //  Use case:
        //      Filter
        services.AddScoped<ICreateFilter, CreateFilter>();
        services.AddScoped<IOperator, Operator>();
        services.AddScoped<IRemoveFilter, RemoveFilter>();

        //  Use case:
        //      Api integrate (Active, Create broadcast)
        services.AddScoped<
            IActiveOpenIntegrationSession,
            ActiveOpenIntegrationSession
        >();
        services.AddScoped<
            ICreateBroadcastOpenIntegrateSession,
            CreateBroadcastOpenIntegrateSession
        >();
    }
}
