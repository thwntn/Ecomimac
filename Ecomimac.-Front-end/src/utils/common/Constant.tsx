export interface Value {
  [key: string]: string
}

export enum RoleNames {
  NavigationHome = "NAVIGATION_HOME",
  NavigationECommerce = "NAVIGATION_E_COMMERCE",
  NavigationOrder = "NAVIGATION_ORDER",
  NavigationCustomer = "NAVIGATION_CUSTOMER",
  NavigationInvoice = "NAVIGATION_INVOICE",
  NavigationMarketing = "NAVIGATION_MARKETING",
  NavigationChat = "NAVIGATION_CHAT",
  NavigationFinancial = "NAVIGATION_FINANCIAL",
  NavigationKanban = "NAVIGATION_KANBAN",

  ProductTaskBar = "PRODUCT_TASK_BAR",
  ProductCreate = "PRODUCT_CREATE",
  ProductList = "PRODUCT_LIST",
  ProductShowFull = "PRODUCT_SHOW_FULL",

  InvoiceTaskbar = "INVOICE_TASKBAR",
  InvoiceCreate = "INVOICE_CREATE",
  InvoiceList = "INVOICE_LIST",
  InvoiceShowFull = "INVOICE_SHOW_FULL",

  CustomerTaskbar = "CUSTOMER_TASKBAR",
  CustomerCreate = "CUSTOMER_CREATE",
  CustomerList = "CUSTOMER_LIST",
  CustomerShowFull = "CUSTOMER_SHOW_FULL",

  PricingTaskbar = "PRICING_TASKBAR",
  PricingPaymentCreate = "PRICING_PAYMENT_CREATE",
  PricingPaymentList = "PRICING_PAYMENT_LIST",
  PricingDiscountCreate = "PRICING_DISCOUNT_CREATE",
  PricingDiscountList = "PRICING_DISCOUNT_LIST",

  ManagerTaskBar = "MANAGER_TASK_BAR",
  ManagerAccountCreate = "MANAGER_ACCOUNT_CREATE",
  ManagerAccountList = "MANAGER_ACCOUNT_LIST",
}

export enum HubMethodName {
  ERROR = "ERROR",
  INITIALIZE = "INITIALIZE",
  EXPENSE_TRANSACTION = "EXPENSE_TRANSACTION",
  EXPENSE_CATEGORY = "EXPENSE_CATEGORY",
  EXPENSE = "EXPENSE",
  FUND = "FUND",
  CASH = "CASH",
  UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION",
  SIGN_LISTEN = "SIGN_LISTEN",
  REMOVE_LISTEN = "REMOVE_LISTEN",
  UPDATE_MESSAGE = "UPDATE_MESSAGE",
  UPDATE_LIST_FILE = "UPDATE_LIST_FILE",
  UPDATE_GROUP = "UPDATE_GROUP",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  SCANNER_PRODUCT = "SCANNER_PRODUCT",
  KANBAN_CATEGORY = "KANBAN_CATEGORY",
  INVOICE_OPEN_TRANSACTION = "INVOICE_OPEN_TRANSACTION",
  INVOICE_CLOSE_TRANSACTION = "INVOICE_CLOSE_TRANSACTION",

  SALE_PROGRAM = "SALE_PROGRAM",
  PROMOTION = "PROMOTION",
  DISCOUNT = "DISCOUNT",
  CUSTOMER = "CUSTOMER",

  DATA = "DATA",
  DATA_INFORMATION = "DATA_INFORMATION",
  BROADCAST = "BROADCAST",
  BROADCAST_INFORMATION = "BROADCAST_INFORMATION",
  TEMPLATE = "TEMPLATE",

  MAIL_CREDENTIAL = "MAIL_CREDENTIAL",
}

export enum AccountStatus {
  Open = 0,
  Valid = 1,
  Lock = 2,
}

export enum ExpenseTransactionCounterNames {
  TODAY = 0,
  WEEK = 1,
  MONTH = 2,
}

export enum CardType {
  JCB = "Jcb",
  VISA = "Visa",
  MASTERCARD = "Mastercard",
}

export enum CashType {
  None = 0,
  Abstract = 1,
  Subtract = 2,
}

export enum BroadcastProcess {
  DRAFT = 0,
  SENDING = 1,
  DONE = 2,
  CANCEL = 3,
  WAITING = 4,
}

export enum DiscountTimeFrameType {
  NORMAL = 0,
  TIME_FRAME = 1,
}

export enum ChannelBroadcast {
  EMAIl = 0,
  TELEGRAM = 1,
  ZALO = 2,
}

export enum DiscountCode {
  AMOUNT = 0,
  PERCENT = 1,
}

export enum DiscountType {
  PRODUCT = 0,
  INVOICE = 1,
}

export enum DataType {
  IMPORT_FROM_EXCEL = 0,
  FROM_CUSTOMER = 1,
}

export enum DiscountQuantityType {
  NONE = 0,
  WITH_QUANTITY = 1,
}

export enum NotificationNames {
  DEFAULT = 1,
  REMOVE_FROM_GROUP = 2,
  INVITE_TO_GROUP = 3,
  UPLOADABLE = 4,
  EXPIRE_PLAN = 5,
  CREATED_EXPENSE_TRANSACTIONS = 6,
}

export enum ActivityNames {
  INVOICE_CREATE = "INVOICE_CREATE",
  INVOICE_UPDATE = "INVOICE_UPDATE",
  INVOICE_DELETE = "INVOICE_DELETE",
  INVOICE_LIST = "INVOICE_LIST",
  INVOICE_ADD_PRODUCT = "INVOICE_ADD_PRODUCT",
  INVOICE_REMOVE_PRODUCT = "INVOICE_REMOVE_PRODUCT",
  INVOICE_SCAN_PRODUCT = "INVOICE_SCAN_PRODUCT",
  INVOICE_CHANGE_CUSTOMER = "INVOICE_CHANGE_CUSTOMER",
  INVOICE_CHANGE_PAYMENT = "INVOICE_CHANGE_PAYMENT",
  INVOICE_CHANGE_QUANTITY_PRODUCT = "INVOICE_CHANGE_QUANTITY_PRODUCT",

  EXPENSE_CATEGORY_CREATE = "EXPENSE_CATEGORY_CREATE",
  EXPENSE_CATEGORY_CLONE = "EXPENSE_CATEGORY_CLONE",
  EXPENSE_CATEGORY_UPDATE = "EXPENSE_CATEGORY_UPDATE",
  EXPENSE_CATEGORY_DELETE = "EXPENSE_CATEGORY_DELETE",
  EXPENSE_TRANSACTIONS_CREATE = "EXPENSE_TRANSACTIONS_CREATE",
  EXPENSE_TRANSACTIONS_UPDATE = "EXPENSE_TRANSACTIONS_UPDATE",
  EXPENSE_TRANSACTIONS_DELETE = "EXPENSE_TRANSACTIONS_DELETE",

  CUSTOMER = "CUSTOMER",
  DISCOUNT = "DISCOUNT",
}

export enum SettingNames {
  DEFAULT_CUSTOMER = "DEFAULT_CUSTOMER",
  DEFAULT_DISCOUNT = "DEFAULT_DISCOUNT",
  DEFAULT_PAYMENT = "DEFAULT_PAYMENT",
  DEFAULT_MONETARISM = "DEFAULT_MONETARISM",

  PACKAGE_FREE = "PACKAGE_FREE",
  PACKAGE_PERSONAL = "PACKAGE_PERSONAL",
  PACKAGE_BUSINESS = "PACKAGE_BUSINESS",
}

export enum PaymentNames {
  CASH = "CASH",
  CREDIT = "CREDIT",
}

export enum Message {
  CONTENT_SHORT = "Nội dung quá ngắn",
  CONTENT_NOT_EMPTY = "Không được để trống",
  CHECK_VALUE = "Giá trị nằm trong khoảng [0:100]",
  PICTURE_CAN_NOT_EMPTY = "Chọn ít nhất 1 ảnh",
  ERROR_INIT = "Đã xảy ra lỗi khi khởi tạo",
  CAN_NOT_EMPTY = "Không được để trống",
  END_DATE = "Ngày kết thúc phải lớn hơn ngày bắt đầu",
  FORMAT_EMAIL = "Sai định dạng email",
  PLEASE_CHOOSE_CODE = "Vui lòng chọn mã",

  ERROR_CODE = "Lỗi",
  ERROR_CODE_DESCRIPTION = "Mã xác nhận không chính xác",

  PLEASE_CHOOSE_CUSTOMER = "Chọn khách hàng",
  UNDER_ZERO = "Giá trị lớn hơn 0",
  INVOICE_REMOVE_PRODUCT = "Bạn sẽ xoá sản phẩm khỏi hoá đơn, bạn vẫn muốn tiếp tục?",
  IAM_DESCRIPTION = "Quản lý danh tính theo từng tài khoản với IAM hoặc sử dụng IAM Identity Center để cung cấp quyền truy cập nhiều tài khoản và chỉ định ứng dụng trên Titan.co.",
  CATEGORY_DESCRIPTION = "Quản lý danh mục đầu tư là một hình thức hiệu quả khi quản lý tài chính. Mỗi một hình thức sẽ có những lợi thế và rủi ro riêng biệt.",

  //  Summary:
  //    Broadcast message notification
  //
  BROADCAST_CLONE_TITLE = "Sao chép chiến dịch",
  BROADCAST_CLONE_DESCRIPTION = "Hành động này sẽ tạo một bản sao mới của chiến dịch gửi tin và bạn có thể chỉnh sửa lại nếu cần. Bạn chắc chắn muốn thực hiện?",
  BROADCAST_COPY_INTEGRATION_TO_CLIPBOARD_DESCRIPTION = "Đường dẫn đã được sao chép vào bộ nhớ tạm. Dán vào trình duyệt hoặc công cụ cần thiết để tiếp tục.",
  BROADCAST_COPY_INTEGRATION_TO_CLIPBOARD = "Sao chép đường dẫn vào bộ nhớ tạm",
  BROADCAST_UPDATE_DATA_TITLE = "Thông báo",
  BROADCAST_UPDATE_DATA_DESCRIPTION = "Bạn sắp đổi nguồn dữ liệu. Hệ thống sẽ cập nhật lại thông tin và các trường đã ánh xạ, bao gồm cả địa chỉ gửi tin. Bạn chắc chắn muốn tiếp tục không?",
  BROADCAST_UPDATE_CONTENT_TITLE = "Bạn có muốn đổi mẫu tin?",
  BROADCAST_UPDATE_CONTENT_DESCRIPTION = "Nếu đổi mẫu tin nhắn, nội dung hiện tại và các trường đang sử dụng sẽ bị thay thế theo mẫu mới",
  BROADCAST_RE_SEND_TITlE = "Gửi lại chiến dịch?",
  BROADCAST_RE_SEND_DESCRIPTION = "Hệ thống sẽ tiến hành gửi lại toàn bộ nội dung của chiến dịch này đến danh sách người nhận. Việc gửi lại có thể khiến một số người dùng nhận được tin nhắn trùng lặp.",
  BROADCAST_STOP_TITLE = "Dừng gửi chiến dịch?",
  BROADCAST_STOP_DESCRIPTION = "Chiến dịch đang được gửi. Nếu bạn dừng lại ngay lúc này, các tin nhắn chưa gửi sẽ bị huỷ và không thể tiếp tục.",
  BROADCAST_DELETE_TITLE = "Xoá chiến dịch này?",
  BROADCAST_DELETE_DESCRIPTION = "Chiến dịch sẽ bị xoá vĩnh viễn khỏi hệ thống, bao gồm toàn bộ cấu hình, nội dung và lịch sử gửi. Hành động này không thể khôi phục.",
  LOGOUT_TITLE = "Đăng xuất khỏi hệ thống",
  LOGOUT_DESCRIPTION = "Bạn chắc chắn muốn đăng xuất khỏi tài khoản? Phiên làm việc hiện tại sẽ kết thúc.",
  BROADCAST_ACTIVE_TITLE = "Xác nhận kích hoạt chiến dịch gửi tin",
  BROADCAST_ACTIVE_DESCRIPTION = "Bạn có chắc chắn muốn kích hoạt chiến dịch này? Việc kích hoạt sẽ bắt đầu quá trình gửi tin và không thể hoàn tác.",

  BROADCAST_CONFIGURATION_DOMAIN_ERROR = "Tên miền sai định dạng. Ex: example.com",
  BROADCAST_CONFIGURATION_FROM_ERROR = "Chưa đúng định dạng. Ex: Admin <example.com>",

  FEATURE_NOT_FINAL = "Tính năng đang phát triển",
  FEATURE_NOT_FINAL_DESCRIPTION = "Chức năng này sẽ sớm được ra mắt trong thời gian tồi. Vui lòng quay lại sau nhé!",
}

export const ActivityMessage: Value = {
  INVOICE_CREATE: "Tạo mới hoá đơn",
  INVOICE_UPDATE: "Cập nhật hoá đơn",
  INVOICE_DELETE: "Xoá hoá đơn",
  EXPENSE_TRANSACTION_CREATE: "Tạo mới chi tiêu",
  EXPENSE_CATEGORY_CREATE: "Tạo danh mục chi tiêu",
  EXPENSE_CATEGORY_UPDATE: "Cập nhật danh mục chi tiêu",
  EXPENSE_CATEGORY_DELETE: "Xoá danh mục chi tiêu",
  EXPENSE_CATEGORY_CLONE: "Sao chép danh mục chi tiêu",
  EXPENSE_TRANSACTIONS_CREATE: "Tạo mới giao dịch",
  EXPENSE_TRANSACTIONS_UPDATE: "Cập nhật giao dịch",
  EXPENSE_TRANSACTIONS_DELETE: "Xoá giao dịch",
}
