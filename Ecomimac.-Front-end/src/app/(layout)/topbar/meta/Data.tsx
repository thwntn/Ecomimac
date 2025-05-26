import { Children } from ".."

export const NAVIGATE: Children[] = [
  {
    name: "Trang chủ",
    href: "/home",
    items: [
      {
        name: "Trang chủ",
        href: "/home",
        description:
          "Mã giảm giá là một dãy ký tự mà có thể giúp người dùng mua với giá ưu đãi hơn bình thường hoặc giảm giá khi mua một sản phẩm",
        icon: "icon/navigation-home.svg",
      },
      {
        name: "Gói",
        href: "/package",
        description:
          "Chiến lược giá là phương pháp nhằm thiết lập mức giá tốt nhất cho một sản phẩm/ dịch vụ",
        icon: "icon/navigation-home-package.svg",
      },
    ],
  },
  {
    name: "Ecommerce",
    href: "/ecommerce",
    items: [
      {
        name: "Mã giảm giá",
        href: "/ecommerce/discount",
        description:
          "Mã giảm giá là một dãy ký tự mà có thể giúp người dùng mua với giá ưu đãi hơn bình thường hoặc giảm giá khi mua một sản phẩm",
        icon: "icon/navigation-discount.svg",
      },
      {
        name: "Khách hàng",
        href: "/ecommerce/customer",
        description:
          "Khách hàng là một cá nhân hoặc doanh nghiệp mua hàng hóa/ dịch vụ của một công ty khác",
        icon: "icon/navigation-customer.svg",
      },
      {
        name: "Sản phẩm",
        href: "/ecommerce/product",
        description:
          "Sản phẩm là bất cứ cái gì có thể đưa vào thị trường để tạo sự chú ý, mua sắm, sử dụng hay tiêu dùng nhằm thỏa mãn một nhu cầu hay ước muốn",
        icon: "icon/navigation-product.svg",
      },
    ],
  },
  {
    name: "Hoá đơn điện tử",
    href: "/invoice",
    items: [
      {
        name: "Thành lập hoá đơn",
        href: "/invoice/create",
        description: "Tạo hoá đơn từ dữ liệu có sẵn",
        icon: "icon/navigation-invoice.svg",
      },
      {
        name: "Tự động",
        href: "/invoice/automation",
        description: "Tự động thành lập và gửi hoá đơn cho khách hàng định kỳ",
        icon: "icon/navigation-invoice-automation.svg",
      },
      {
        name: "Danh sách",
        href: "/invoice/list",
        description: "Tất cả hoá đơn đã xuất",
        icon: "icon/navigation-invoice-list.svg",
      },
      {
        name: "Màn hình",
        href: "/invoice/display",
        description: "Hiển thị thanh toán & quản bá",
        icon: "icon/navigation-invoice-display.svg",
      },
      {
        name: "Thiết lập",
        href: "/invoice/product",
        description: "Cài đặt thông tin thanh toán, chương trình khuyến mãi",
        icon: "icon/navigation-invoice-setting.svg",
      },
    ],
  },
  {
    name: "Chi tiêu",
    href: "/spend",
    items: [
      {
        name: "Giao dịch",
        href: "/spend/transaction",
        description:
          "Một ứng dụng hỗ trợ người sử dụng trong việc quản lý công việc và sự kiện, từ cá nhân cho đến làm việc nhóm",
        icon: "icon/navigation-transaction.svg",
      },
      {
        name: "Sự kiện",
        href: "/kanban",
        description:
          "Ứng dụng quản trị dự án vào việc lập kế hoạch và triển khai sự kiện như hội nghị, hòa nhạc,...",
        icon: "icon/navigation-event.svg",
      },
    ],
  },
  {
    name: "Trò chuyện",
    href: "/chat",
    items: [
      {
        name: "Tin nhắn",
        href: "/chat/message",
        description:
          "Trò chuyện cho phép gửi tin nhắn văn bản có độ dài khoảng 160 ký tự (chữ cái, số và ký hiệu). Đối với các ngôn ngữ khác có nhiều ký tự hơn",
        icon: "icon/navigation-chat.svg",
      },
      {
        name: "Kênh",
        href: "/chat/message",
        description:
          "Trò chuyện trực tuyến có thể đề cập đến bất kỳ loại giao tiếp nào qua Internet cung cấp truyền tin nhắn văn bản theo thời gian thực từ người gửi đến người nhận",
        icon: "icon/navigation-channel.svg",
      },
    ],
  },
  {
    name: "Kanban",
    href: "/kanban",
    icon: "icon/navigation-kanban.svg",
    items: [
      {
        name: "Công việc",
        href: "/kanban",
        description:
          "Một ứng dụng hỗ trợ người sử dụng trong việc quản lý công việc và sự kiện, từ cá nhân cho đến làm việc nhóm",
        icon: "icon/navigation-kanban.svg",
      },
      {
        name: "Sự kiện",
        href: "/kanban",
        description:
          "Ứng dụng quản trị dự án vào việc lập kế hoạch và triển khai sự kiện như hội nghị, hòa nhạc,...",
        icon: "icon/navigation-event.svg",
      },
    ],
  },
]
