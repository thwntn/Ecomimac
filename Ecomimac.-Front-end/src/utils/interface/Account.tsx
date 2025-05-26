import { AccountStatus } from "@/utils/common"

const INIT_STRING = String()
const INIT_NUMBER = 0

export interface RoleResponse {
  id: string
  created: string
  name: string
  code: string
  image: string
}

export interface RoleAccountResponse {
  accountId: string
  account: AccountResponse
  roleId: string
  role: RoleResponse
}

export class AccountResponse {
  id: string = INIT_STRING
  created: string = INIT_STRING
  token: string = INIT_STRING
  userName: string = INIT_STRING
  accountStatus: AccountStatus = INIT_NUMBER
  code: string = INIT_STRING
  accountType: number = INIT_NUMBER
  profile: ProfileResponse = new ProfileResponse()
  roleAccounts: RoleAccountResponse[] = []
}

export class ProfileResponse {
  id: string = INIT_STRING
  name: string = INIT_STRING
  avatar: string = INIT_STRING
  email: string = INIT_STRING
  phone: string = INIT_STRING
  coverPicture: string = INIT_STRING
  address: string = INIT_STRING
  accountId: string = INIT_STRING
  description: string = INIT_STRING
  lastLogin: string = INIT_STRING
}

export interface LoginAccounts {
  accountId: string
  created: string
}
