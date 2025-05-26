import {
  DiscountTimeFrameType,
  DiscountQuantityType,
  DiscountCode,
} from "@/utils/common"
import { ProfileResponse } from "./Account"
import { InvoiceResponse } from "./Invoice"
import { TagResponse } from "./Tag"

export interface DiscountResponse {
  id: string
  name: string
  created: string
  code: string
  status: number
  description: string
  invoiceDiscounts: InvoiceDiscount[]
  applied: number
  amount: number
  maxAmount: number
  percent: number
  quantity: number
  used: number
  fromDate: string
  toDate: string
  compare: number
  profileId: number
  profile: ProfileResponse
  discountCode: DiscountCode
  discountTimeFrameType: DiscountTimeFrameType
  discountQuantityType: DiscountQuantityType
  discountTags: DiscountTagResponse[]
}

export interface InvoiceDiscount {
  invoiceId: string
  invoice: InvoiceResponse
  percent: number
  amount: number
}

export interface ChartResponse {
  date: string
  amount: number
}

export interface DiscountTagResponse {
  discount: DiscountResponse
  tag: TagResponse
}
