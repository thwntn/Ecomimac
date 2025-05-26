import { ProfileResponse } from "."
import { TagResponse } from "./Tag"

export class ProductResponse {
  id: string
  name: string
  code: string
  description: string
  created: string
  price: number
  salePercent: number
  maxSaleAmount: number
  htmlDetail: string
  profileId: string
  profile: ProfileResponse
  invoiceProducts: Array<object>
  imageProducts: ProductImagesResponse[]
  quantity: number
  images: File[]
  productTags: ProductTagResponse[]
}

export interface ProductImagesResponse {
  id: string
  url: string
  isMain: boolean
  productId: string
}

export interface ProductTagResponse {
  product: ProductResponse
  tag: TagResponse
}
