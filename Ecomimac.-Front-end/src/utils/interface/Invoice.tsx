import { DiscountResponse, ProductResponse, ProfileResponse } from "."
import { CustomerResponse } from "./Customer"
import { PaymentResponse } from "./Payment"

export interface InvoiceResponse {
  customer: CustomerResponse
  payment: PaymentResponse
  invoiceDiscounts: DiscountResponse[]
  updated: string
  description: string
  basePrice: number
  discountPrice: number
  latestPrice: number
  created: string
  monetaryUnit: number
  invoiceProducts: InvoiceProductResponse[]
  profile: ProfileResponse
  status: number
  code: string
  id: string
}

export interface InvoiceProductResponse {
  price: number
  quantity: number
  product: ProductResponse
}

export class InvoiceStatusResponse {
  title: string
  key: number
  description: string
  color: string
  backgroundColor: string
  quantity: number
  icon: string
  totalCost: number
}

export interface QRResponse {
  amount: number
  code: string
}

export interface BankAccountResponse {
  accountNo: string
  bankId: string
  accountNane: string
}
