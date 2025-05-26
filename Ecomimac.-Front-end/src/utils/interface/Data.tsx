import { DataType } from "@/utils/common"
import { ProfileResponse } from "./Account"
import { BroadcastResponse } from "./Broadcast"

export interface DataResponse {
  id: string
  name: string
  description: string
  parseSchema: string[]
  profileId: string
  status: number
  type: DataType
  filters: Array<FilterResponse>
  profile: ProfileResponse
  records: PreviewResponse
  quantityRecord: number
  created: string
  updated: string
  deleted: string
  deleteBy: string
  broadcasts: Array<BroadcastResponse>
}

export class PreviewResponse {
  schema: Array<string>
  data: Array<{ [key: string]: string }>
}

export interface FilterResponse {
  id: string
  column: string
  value: string
  operator: number
  dataId: string
  created: string
  updated: string
}

export interface DataCounterResponse {
  quantityData: number
  quantityImport: number
  recent: Array<DataResponse>
}

export interface OperatorResponse {
  key: number
  title: string
  description: string
}

export interface StatusResponse {
  enum: number
  name: string
  description: string
  color: string
  backgroundColor: string
}
