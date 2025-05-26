import { BroadcastProcess, ChannelBroadcast } from "@/utils/common"
import { ProfileResponse } from "./Account"
import { ContentResponse } from "./Content"
import { DataResponse } from "./Data"
import { EmailCredentialResponse } from "./EmailCredential"

export interface BroadcastResponse {
  id: string
  channel: ChannelBroadcast
  content: ContentResponse
  created: string
  deleteBy: string
  deleted: string
  sendKey: string
  data: DataResponse
  parseMap: Array<KeyAndValueResponse>
  emailCredential: EmailCredentialResponse
  emailCredentialId: string
  name: string
  description: string
  profile: ProfileResponse
  profileId: string
  process: BroadcastProcess
  updated: string
  zaloCredential: object
  zaloCredentialId: string
  times: number
  numberSuccess: number
  numberFailed: number
}

export interface KeyAndValueResponse {
  key: string
  value: string
}

export interface ChannelResponse {
  name: string
  icon: string
  description: string
  enum: number
}

export interface StatusBroadcastResponse {
  enum: BroadcastProcess
  name: string
  description: string
  color: string
  backgroundColor: string
}

export interface CounterBroadcastResponse {
  runCount: number
  broadcastCount: number
  successCountCount: number
  failedCount: number
  runningCount: number
  priceEstimatePerMessage: number
}

export interface CounterHistoryBroadcastResponse
  extends CounterBroadcastResponse {
  times: number
}
