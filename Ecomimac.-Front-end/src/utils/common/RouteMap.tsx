export enum RouteMap {
  INVOICE = "invoices",
  INVOICE_STATUS = "invoice-status",
  UPDATE_IMAGE = "update-image",
  SCANNER_PRODUCT = "scanner-product",
  ACTIVITY = "activities",
  ACTIVE_TRANSACTION = "active-transaction",
  CLOSE_TRANSACTION = "close-transaction",
  BANK_ACCOUNT = "bank-accounts",

  DATA = "data",
  PREVIEW = "preview",
  IMPORT = "import",
  RECORD = "records",
  EMAIL_CREDENTIAL = "email-credentials",

  TEMPLATE = "templates",

  BANNER = "banners",
  BROADCASTS = "broadcasts",
  BROADCAST_UPDATE_DATA = "change-data",
  BROADCAST_UPDATE_CONTENT = "change-content",
  BROADCAST_HISTORY_COUNTER = "history-counters",
  BROADCAST_STOP = "stop",
  HISTORY = "histories",
  LOOP = "loop",
  RENAME = "rename",
  REFERENCE = "reference",
  CHANNEL = "channels",
  ACTIVE = "active",
  CONTENTS = "contents",
  ZALO_NOTIFICATION_SERVICE_PREVIEW = "contents/zalo-notification-service-preview",

  FILTER = "filters",
  OPERATOR = "operators",
  CLONE = "clone",

  ICONS = "icons",
  LOG = "log",
  STATUS = "status",
  REPORTS = "reports",

  KABAN_CATEGORIES = "kanban-categories",
  KABANS = "kabans",

  MOVE = "move",
  IMAGE = "image",

  TAGS = "tags",

  EXPENSE_TRANSACTIONS = "expense-transactions",
  EXPENSE_CATEGORY = "expense-categories",
  EXPENSE = "expenses",
  CATEGORY = "categories",

  STATISTIC = "statistic",
  COUNTER = "counters",
  EXPENDITURE = "expenditure",

  FUND = "funds",
  CASH = "cash",
  CASH_DESCRIPTIONS = "cash-descriptions",
  RECENT = "recent",
  CHART = "charts",
  POTENTIAL = "potential",

  CUSTOMER = "customers",
  CUSTOMER_RECENT_INVOICE = "recent-invoices",

  PAYMENTS = "payments",
  PACKAGE = "packages",

  SETTING = "settings",

  DISCOUNT = "discounts",
  DISCOUNT_INVOICE = "discount-invoices",

  PRODUCT = "products",

  PROMOTION = "promotions",
  SALE_PROGRAM = "sale-programs",
  REVENUE = "revenue",

  LOGIN = "auth/signin-with-password",
  SIGNUP = "auth/signup",
  CONFIRM_CODE = "auth/confirm-code",
  PROFILE = "profiles",
  EXTRA = "extra",
  SIGNIN = "signin",
  SWITCH_ACCOUNT = "switch",
  UPDATE_LOC_OPEN = "update-lock-open",
  CHANGE_AVATAR = "update-avatar",
  UPDATE_COVER = "update-cover-picture",

  NOTIFICATIONS = "notifications",

  TRANSACTION = "transaction",

  OPEN_INTEGRATE_SESSION = "open-integrate-session",
  OPEN_INTEGRATE_SESSION_CREATE_BROADCAST = "broadcast",
}

export enum Redirect {
  ACCOUNT = "account",
  HOME = "/home/overview",
  PROFILE = "/profile",
  CONFIRM = "confirm",
  SIGN_UP = "signup",
  AUTH = "auth",
  LOGIN = "login",

  DISCOUNT = "/e-commerce/discount",

  FINANCIAL = "financial",
  EXPENSE = "expense",
  EXPENSE_CATEGORY = "/expense-category",
  CATEGORY = "/category",
  TRANSACTION = "transaction",
  PLAN_AND_BILLING = "/package",

  MARKETING = "marketing",
  CONTENT = "content",
  BROADCAST = "broadcast",
  HISTORY = "history",
  DATA = "data",

  FUND_INFORMATION = "fund",
  PRODUCT = "/e-commerce/product",
  INVOICE = "/invoice",
  CREATE = "/create",

  LIST = "list",
  PRINT = "/print",

  SALE_PROGRAM = "sale-program",
}
