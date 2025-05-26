import EMPTY_EMAIL_MESSAGE from "./sample/empty-email-message"
import ONE_TIME_PASSCODE from "./sample/one-time-passcode"
import ORDER_ECOMMERCE from "./sample/order-ecommerce"
import POST_METRICS_REPORT from "./sample/post-metrics-report"
import RESERVATION_REMINDER from "./sample/reservation-reminder"
import RESET_PASSWORD from "./sample/reset-password"
import RESPOND_TO_MESSAGE from "./sample/respond-to-message"
import SUBSCRIPTION_RECEIPT from "./sample/subscription-receipt"
import WELCOME from "./sample/welcome"

export const SAMPLES = [
  {
    name: "Soạn tin mới",
    setting: EMPTY_EMAIL_MESSAGE,
  },
  {
    name: "Mã xác nhận dùng 1 lần",
    setting: ONE_TIME_PASSCODE,
  },
  {
    name: "Phiếu mua hàng",
    setting: ORDER_ECOMMERCE,
  },
  {
    name: "Báo cáo",
    setting: POST_METRICS_REPORT,
  },
  {
    name: "Nhắc nhở",
    setting: RESERVATION_REMINDER,
  },
  {
    name: "Thay đổi mật khẩu",
    setting: RESET_PASSWORD,
  },
  {
    name: "Phản hồi tin nhắn",
    setting: RESPOND_TO_MESSAGE,
  },
  {
    name: "Hoá đơn",
    setting: SUBSCRIPTION_RECEIPT,
  },
  {
    name: "Chào mừng",
    setting: WELCOME,
  },
]
