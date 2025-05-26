import {
  DiscountQuantityType,
  DiscountTimeFrameType,
  DiscountCode,
  DiscountType,
} from "@/utils/common"

export interface ObjectType<T> {
  enum: T
  name: string
}

export const quantitySelectOptions: Array<ObjectType<DiscountQuantityType>> = [
  {
    enum: DiscountQuantityType.NONE,
    name: "Không giới hạn số lượng",
  },
  {
    enum: DiscountQuantityType.WITH_QUANTITY,
    name: "Tuỳ chỉnh số lượng",
  },
]

export const discountSelectOptions: Array<ObjectType<DiscountTimeFrameType>> = [
  {
    enum: DiscountTimeFrameType.NORMAL,
    name: "Không giới hạn thời gian",
  },
  {
    enum: DiscountTimeFrameType.TIME_FRAME,
    name: "Khoảng thời gian",
  },
]

export const discountCodeSelectOptions: Array<ObjectType<DiscountCode>> = [
  {
    enum: DiscountCode.AMOUNT,
    name: "Giá cố đinh cho hoá đơn",
  },
  {
    enum: DiscountCode.PERCENT,
    name: "Giảm theo % tổng hoá đơn",
  },
]

export const discountTypeSelectOptions: Array<ObjectType<DiscountType>> = [
  {
    enum: DiscountType.PRODUCT,
    name: "Hoá đơn",
  },
  {
    enum: DiscountType.INVOICE,
    name: "Sản phẩm",
  },
]
