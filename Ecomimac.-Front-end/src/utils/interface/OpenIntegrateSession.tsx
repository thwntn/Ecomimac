import { BroadcastResponse } from "./Broadcast"

export interface OpenIntegrateSessionResponse {
  session: string
  expired: string
  status: number
  type: number
  broadcastId: string
  broadcast: BroadcastResponse
  profileId: string
  profile: string
  id: string
  created: string
  updated: string
}
