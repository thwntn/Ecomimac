import { ProfileResponse } from "./Account"

export interface ContentResponse {
  id: string
  name: string
  created: string
  description: string
  mode: number
  profile: ProfileResponse
  setup: string
  text: string
  mapField: string
}
