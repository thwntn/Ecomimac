import { InvoiceResponse } from "."
import { TagResponse } from "./Tag"

export class CustomerResponse {
  id: string
  created: string
  name: string
  fullName: string
  address: string
  phone: string
  emailAddress: string
  birthday: string
  image: string
  profileId: string
  invoices: InvoiceResponse[]
  customerTags: CustomerTagResponse[]
}

export class CustomerTagResponse {
  customer: CustomerResponse
  tag: TagResponse
}
