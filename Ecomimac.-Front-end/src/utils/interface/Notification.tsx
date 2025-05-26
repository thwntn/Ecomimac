import { NotificationNames } from "@/utils/common"
import { ProfileResponse } from "."

export interface NotificationResponse {
  id: string
  type: NotificationNames
  jsonData: string
  isRead: boolean
  handle: boolean
  from: ProfileResponse
  profile: ProfileResponse
  created: string
}
