import { RoleNames } from "@/utils/common"

export interface Children {
  //  Summary:
  //      URL Configuration
  href: string

  name: string
  icon?: string
  role?: RoleNames
  items?: Children[]
}

export const NAVIGATE: Children[] = [
  {
    name: "Trang chủ",
    href: "/home",
    icon: "icon/navigation-home-new.svg",
    role: RoleNames.NavigationHome,
    items: [
      {
        name: "Tổng quan",
        href: "/home/overview",
      },
      {
        name: "Nâng cấp",
        href: "/home/package",
      },
    ],
  },
  {
    name: "Kinh doanh",
    href: "/e-commerce",
    role: RoleNames.NavigationECommerce,
    icon: "icon/navigation-ecommerce.svg",
    items: [
      {
        name: "Chương trình",
        href: "/e-commerce/sale-program",
      },
      {
        name: "Khuyến mãi",
        href: "/e-commerce/promotional",
      },
      {
        name: "Mã giảm giá",
        href: "/e-commerce/discount",
      },
      {
        name: "Sản phẩm",
        href: "/e-commerce/product",
      },
    ],
  },
  {
    name: "Người dùng",
    href: "/client",
    role: RoleNames.NavigationCustomer,
    icon: "icon/navigation-customer.svg",
    items: [
      {
        name: "Khách hàng",
        href: "/client/customer",
      },
      {
        name: "Thành viên",
        href: "/client/member",
      },
    ],
  },
  {
    name: "Đơn hàng",
    href: "/order",
    role: RoleNames.NavigationOrder,
    icon: "icon/navigation-order.svg",
    items: [
      {
        name: "Danh sách",
        href: "/order/list",
      },
      {
        name: "Xác nhận",
        href: "/order/wait-confirm",
      },
      {
        name: "Giao hàng",
        href: "/order/wait-delivery",
      },

      {
        name: "Hoàn tất",
        href: "/order/done",
      },
    ],
  },
  {
    name: "Hoá đơn",
    href: "/invoice",
    role: RoleNames.NavigationInvoice,
    icon: "icon/navigation-invoice-new.svg",
    items: [
      {
        name: "Tạo mới",
        href: "/invoice/create",
        icon: "icon/navigation-invoice.svg",
      },
      {
        name: "Tự động",
        href: "/invoice/automation",
        icon: "icon/navigation-invoice-automation.svg",
      },
      {
        name: "Danh sách",
        href: "/invoice/list",
        icon: "icon/navigation-invoice-list.svg",
      },
      {
        name: "Màn hình",
        href: "/invoice/display",
        icon: "icon/navigation-invoice-display.svg",
      },
      {
        name: "Thiết lập",
        href: "/invoice/product",
        icon: "icon/navigation-invoice-setting.svg",
      },
    ],
  },
  {
    name: "Quảng bá",
    href: "/marketing",
    role: RoleNames.NavigationMarketing,
    icon: "icon/navigation-broadcast.svg",
    items: [
      {
        name: "Dữ liệu & lọc",
        href: "/marketing/data",
      },
      {
        name: "Gửi tin",
        href: "/marketing/broadcast",
      },
      {
        name: "Mẫu tin nhắn",
        href: "/marketing/content",
      },
      {
        name: "Cấu hình",
        href: "/marketing/configuration",
      },
    ],
  },
  {
    name: "Trò chuyện",
    href: "/chat",
    role: RoleNames.NavigationChat,
    icon: "icon/navigation-chat-new.svg",
    items: [
      {
        name: "Tin nhắn",
        href: "/chat/message",
        icon: "icon/navigation-chat.svg",
      },
      {
        name: "Kênh",
        href: "/chat/message",
        icon: "icon/navigation-channel.svg",
      },
    ],
  },
  {
    name: "Chi tiêu",
    href: "/financial",
    role: RoleNames.NavigationFinancial,
    icon: "icon/navigation-financial.svg",
    items: [
      {
        name: "Giao dịch",
        href: "/financial/expense",
        icon: "icon/navigation-transaction.svg",
      },
      {
        name: "Quỹ giao dịch",
        href: "/financial/fund",
        icon: "icon/navigation-transaction.svg",
      },
      {
        name: "Sự kiện",
        href: "/kanban",
        icon: "icon/navigation-event.svg",
      },
    ],
  },
  {
    name: "Kanban",
    href: "/kanban",
    role: RoleNames.NavigationKanban,
    icon: "icon/navigation-kanban-new.svg",
    items: [
      {
        name: "Công việc",
        href: "/kanban",
        icon: "icon/navigation-kanban.svg",
      },
      {
        name: "Sự kiện",
        href: "/event",
        icon: "icon/navigation-event.svg",
      },
    ],
  },
]
