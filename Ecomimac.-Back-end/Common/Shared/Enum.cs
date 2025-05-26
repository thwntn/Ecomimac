namespace ReferenceShared;

public enum ConfigurePgDatabase
{
    Npgsql,
    EnableLegacyTimestampBehavior,
}

public enum EnvironmentNames
{
    Host,
    Database,
    TimeZone,
    AppName,
    QueueHost,
    QueueUserName,
    QueuePassword,
    Api,
    MinioHost,
    MinioAccess,
    MinioSecret,
    Issuer,
    Audience,
    JwtKey,
    Storage,
    Media,
    Static,
    Migration,
    Swagger,
    SwaggerLabel,
    RouterPrefix,
    VersionSwagger,
    SwaggerNameReplace,
    SwaggerNameTo,
    TokenScheme,
    Authorization,
    OauthHost,
    ProfileHost,
    ClientId,
    SecretId,
    GoogleRedirect,
    GrandType,
    HistoryConnect,
    HistoryDirectory,
    RedirectUri,
    SizeStorage,
    MaiUserName,
    MailApiKey,
    MailFrom,
    MailDomain,
    GeminiUrl,
    GeminiKey,
    TelegramBotUri,
    Vnpay,
    VnPayHashSecret,
}

public enum CacheNames
{
    MessageQueueBroadcastMailgun,
}

public enum MessageQueueNames
{
    MailGunQueue,
}

public enum Policy
{
    Cors,
}

public enum AccountNames
{
    Email = 1,
    Google = 2,
    SubAccount = 3,
}

public enum AccountStatus
{
    Open = 0,
    Valid = 1,
    Lock = 2,
}

public enum ActivityNames
{
    INVOICE_CREATE,
    INVOICE_UPDATE,
    INVOICE_DELETE,
    INVOICE_LIST,
    INVOICE_ADD_PRODUCT,
    INVOICE_REMOVE_PRODUCT,
    INVOICE_SCAN_PRODUCT,
    INVOICE_CHANGE_CUSTOMER,
    INVOICE_CHANGE_PAYMENT,
    INVOICE_CHANGE_QUANTITY_PRODUCT,

    EXPENSE_CREATE,
    EXPENSE_CLONE,
    EXPENSE_UPDATE,
    EXPENSE_DELETE,
    EXPENSE_TRANSACTION_CREATE,
    EXPENSE_TRANSACTION_UPDATE,
    EXPENSE_TRANSACTION_DELETE,

    CUSTOMER,
    DISCOUNT,
}

public enum StorageNames
{
    File,
    Folder,
}

public enum StorageStatus
{
    Trash,
    Normal,
}

public enum DefaultFolder
{
    DefaultFolder = -1,
    HeadlessFolder = -2,
}

public enum NotificationNames
{
    DEFAULT = 1,
    REMOVE_FROM_GROUP = 2,
    INVITE_TO_GROUP = 3,
    UPLOADABLE = 4,
    EXPIRE_PLAN = 5,
    CREATED_EXPENSE_TRANSACTION = 6,
    EXPENSE_TRANSACTION_CREATE = 7,
}

public enum GroupInviteStatus
{
    Invited,
    Accept,
}

public enum HubMethodName
{
    ERROR,
    INITIALIZE,
    EXPENSE_TRANSACTION,
    EXPENSE,
    FUND,
    CASH,
    UPDATE_NOTIFICATION,

    SIGN_LISTEN,
    REMOVE_LISTEN,
    UPDATE_MESSAGE,
    UPDATE_LIST_FILE,

    DATA,
    DATA_INFORMATION,
    TEMPLATE,
    BROADCAST,
    BROADCAST_INFORMATION,
    PROFILE_CONFIG,

    UPDATE_GROUP,
    UPDATE_PRODUCT,
    SCANNER_PRODUCT,
    KANBAN_CATEGORY,

    INVOICE_OPEN_TRANSACTION,
    INVOICE_CLOSE_TRANSACTION,
    INVOICE_FINISH_TRANSACTION,

    SALE_PROGRAM,
    PROMOTION,
    DISCOUNT,
    CUSTOMER,

    MAIL_CREDENTIAL,
}

public enum PaymentMethod
{
    Cash = 0,
    Credit = 1,
}

public enum MonetaryUnit
{
    Vnd = 0,
    Usd = 1,
}

public enum StatusNote
{
    Default = 0,
    Archive = 1,
    Remove = 2,
}

public enum DiscountStatus
{
    Active = 0,
    Suspend = 1,
}

public enum CashNames
{
    None = 0,
    Abstract = 1,
    Subtract = 2,
}

public enum SettingNames
{
    DEFAULT_CUSTOMER,
    DEFAULT_DISCOUNT,
    DEFAULT_PAYMENT,

    PACKAGE_FREE,
    PACKAGE_PERSONAL,
    PACKAGE_BUSINESS,

    BANK_ID,
    BANK_ACCOUNT_NAME,
    BANK_ACCOUNT_NO,

    TELEGRAM_TOKEN,
    TELEGRAM_CHAT_ID,
}

public enum ExpenseTransactionCounterNames
{
    TODAY = 0,
    WEEK = 1,
    MONTH = 2,
}

public enum InvoiceStatus
{
    DRAFT = 0,
    WAITING = 1,
    ACTIVE = 2,
    DONE = 3,
    OWE_MONEY = 4,
}

public enum SaleProgramStatus
{
    NOT_ACTIVE = 0,
    ACTIVE = 1,
    OUT_OF_TIME_RANGE = 2,
}

public enum StatusTransaction
{
    ACCEPT = 0,
    ERROR = 1,
    WARNING = 2,
}

public enum DiscountTimeFrameType
{
    NORMAL = 0,
    TIME_FRAME = 1,
}

public enum DiscountCode
{
    AMOUNT = 0,
    PERCENT = 1,
}

public enum DiscountType
{
    NONE = -1,
    PRODUCT = 0,
    INVOICE = 1,
}

public enum DiscountQuantityType
{
    NONE = 0,
    WITH_QUANTITY = 1,
}

public enum PromotionType
{
    BOGO = 0,
    EARN_POINT = 1,
    FLASH_SALE = 2,
    FREE_SHIP = 3,
    LOYAL_MEMBER = 4,
}

public enum DataType
{
    IMPORT_FROM_EXCEL = 0,
    FROM_CUSTOMER = 1,
}

public enum PromotionProductType
{
    NO_LIMIT = 0,
    LIMIT = 1,
}

public enum ChannelBroadcast
{
    EMAIl = 0,
    TELEGRAM = 1,
    ZALO = 2,
}

public enum BroadcastProcess
{
    DRAFT = 0,
    SENDING = 1,
    DONE = 2,
    CANCEL = 3,
    WAITING = 4,
    QUEUE = 5,
}

public enum HistoryStatus
{
    FAILED = 0,
    SUCCESS = 1,
    CONTACT_NOT_VALID_FORMAT = 100,
    ERROR_WHEN_REQUEST_TO_MAILGUN = 200,
}

public enum Condition
{
    EQUAL = 0,
    NOT_EQUAL = 1,
    GREATER = 2,
    LESS = 3,
    IN = 4,
    NOT_IN = 5,
    LIKE = 6,
}

public enum DataStatus
{
    IMPORT = 0,
    INITIALIZE = 1,
    DONE = 2,
}

public enum OpenIntegrateStatus
{
    CLOSE = 0,
    OPEN = 1,
}

public enum OpenIntegrationType
{
    BROADCAST = 0,
}
