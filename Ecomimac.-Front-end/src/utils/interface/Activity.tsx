import { ProfileResponse } from "."

export interface ActivityResponse {
  id: string
  created: string
  update: string
  jsonData: string
  type: string
  profileId: string
  profile: ProfileResponse
}
