import { ProfileResponse } from "./Account"

export interface EmailCredentialResponse {
  id: string
  apiKey: string
  created: string
  domain: string
  from: string
  name: string
  userName: string
  profile: ProfileResponse
}
