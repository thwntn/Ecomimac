import { CashType } from "@/utils/common"

export class FundResponse {
  id: string
  created: string
  name: string
  type: string
  number: string
  author: string
  profileId: string
  description: string
  backgroundUrl: string
  total: number
  cashes: CashResponse[]
}

export interface CashResponse {
  id: string
  created: string
  name: string
  isActive: string
  quantity: string
  fundId: string
  totalAbstract: number
  totalSubtract: number
  cashDescriptions: CashDescriptionResponse[]
}

export interface CashDescriptionResponse {
  id: string
  created: string
  updated: string
  name: string
  quantity: string
  cashType: CashType
  cashId: string
}
