import { PromotionType } from "@/app/(features)/e-commerce/promotional/_Meta"
import { ProfileResponse } from "./Account"
import { ProductResponse } from "./Product"
import { TagResponse } from "./Tag"

export class PromotionResponse {
  id: string
  name: string
  description: string
  promotionType: PromotionType
  fromDate: string
  toDate: string
  created: string
  profileId: string
  profile: ProfileResponse
  promotionProducts: PromotionProduct[]
  promotionTags: PromotionTagResponse[]
}

export class PromotionProduct {
  buyProduct: ProductResponse
  freeProduct: ProductResponse
  minQuantity: number
  quantity: number
  maxFreeQuantity: number
}

export class PromotionTagResponse {
  tag: TagResponse
  promotion: PromotionResponse
}
