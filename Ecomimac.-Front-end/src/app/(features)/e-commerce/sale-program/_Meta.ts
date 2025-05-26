export enum PromotionType {
  BOGO = 0,
  EARN_POINT = 1,
  FLASH_SALE = 2,
  FREE_SHIP = 3,
  LOYAL_MEMBER = 4,
}

export enum QuantityType {
  UNLIMIT = 0,
  LIMIT = 1,
}

export const promotionOptions = [
  {
    name: "Khuyến mãi tặng thêm",
    enum: PromotionType.BOGO,
  },
  {
    name: "Tích điểm đổi quà",
    enum: PromotionType.EARN_POINT,
  },
  {
    name: "Flash sale/Giờ vàng giảm sốc",
    enum: PromotionType.FLASH_SALE,
  },
  {
    name: "Miễn phí vận chuyển",
    enum: PromotionType.FREE_SHIP,
  },
]

export const limitQuantitySelection = [
  {
    name: "Không giới hạn số lượng",
    enum: QuantityType.UNLIMIT,
  },
  {
    name: "Giới hạn số lượng",
    enum: QuantityType.LIMIT,
  },
]

export const FILTER_LIST = [
  {
    name: "Sắp xếp theo tên tăng dần",
    data: "Name",
  },
  {
    name: "Sắp xếp theo ngày tạo giảm dần",
    data: "Created",
  },
]

export const SEARCH_COLUMN = "Name"
