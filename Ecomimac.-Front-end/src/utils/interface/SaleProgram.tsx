import { ProfileResponse } from "./Account"
import { DiscountResponse } from "./Discount"
import { ProductResponse } from "./Product"
import { PromotionResponse } from "./Promotion"

export interface RevenueResponse {
  totalCost: number
  sumRevenues: SumRevenue[]
}

export interface SumRevenue {
  percent: number
  total: number
  product: ProductResponse
}

export interface SaleProgramResponse {
  id: string
  name: string
  description: string
  created: string
  fromDate: string
  toDate: string
  status: number
  profileId: string
  profile: ProfileResponse
  saleProgramPromotions: SaleProgramPromotionResponse[]
  saleProgramDiscounts: SaleProgramDiscountResponse[]
  saleProgramProducts: SaleProgramProductResponse[]
}

export interface SaleProgramPromotionResponse {
  saleProgramId: string
  promotionId: string
  promotion: PromotionResponse
}

export interface SaleProgramDiscountResponse {
  saleProgramId: string
  discountId: string
  discount: DiscountResponse
}

export interface SaleProgramProductResponse {
  saleProgramId: string
  productId: string
  product: ProductResponse
}

export interface CounterSaleProgramResponse {
  totalCost: number
  quantity: number
  quantityProduct: number
}

export class SaleProgramStatusResponse {
  title: string
  key: number
  description: string
  color: string
  backgroundColor: string
  quantity: number
  icon: string
  totalCost: number
}

export interface SaleProgramReportResponse {
  dateTime: string
  amount: number
}
