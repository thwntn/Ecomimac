import { Redirect } from "@/utils/common"
import { AccountResponse } from "@/utils/interface"
import CryptoJS from "crypto-js"
const _ = ""

const encrypt = (str: string) =>
  CryptoJS.AES.encrypt(str, _ + process.env.NEXT_PUBLIC_KEY).toString()
const decrypt = (str: string | null) => {
  if (str === null) return _
  return CryptoJS.AES.decrypt(str, _ + process.env.NEXT_PUBLIC_KEY).toString(
    CryptoJS.enc.Utf8
  )
}

//  Summary:
//      Get account activated
export const getActive = () =>
  Number(
    decrypt(
      window.localStorage.getItem(_ + process.env.NEXT_PUBLIC_ACCOUNT_ACTIVE)
    )
  )

//  Summary:
//      Get list accounts
export const getAccounts = (): AccountResponse[] => {
  const identify = window.localStorage.getItem(
    _ + process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME
  )

  if (identify === null) return []
  return JSON.parse(decrypt(identify))
}

//  Summary:
//      Switch account
export const switchAccount = (index: number) => {
  const accounts = getAccounts()
  const account = accounts[index]

  if (account === undefined) return

  window.localStorage.setItem(
    _ + process.env.NEXT_PUBLIC_ACCOUNT_ACTIVE,
    encrypt(_ + index)
  )

  window.location.replace(Redirect.HOME)
}

//  Summary:
//      Setup identify data
export const setup = (data: AccountResponse) => {
  let accounts = getAccounts()
  const index = accounts.findIndex((account) => account.id === data.id)

  if (index === -1) accounts = accounts.concat(data)
  else accounts[index] = data

  window.localStorage.setItem(
    _ + process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME,
    encrypt(JSON.stringify(accounts))
  )

  window.localStorage.setItem(
    _ + process.env.NEXT_PUBLIC_ACCOUNT_ACTIVE,
    encrypt(_ + (index === -1 ? accounts.length - 1 : index))
  )
}

//  Summary:
//      Logout account & goto account page manager
export const logout = (accountId: string): void => {
  const accounts = getAccounts()
  const outs = accounts.filter(
    (account) => (account.id === accountId) === false
  )

  window.localStorage.setItem(
    _ + process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME,
    encrypt(JSON.stringify(outs))
  )

  window.location.replace(_ + process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME_URL)
}

//  Summary:
//      Hook state accounts
export const useAccount = (redirect: boolean = true): AccountResponse => {
  const index = getActive()
  const accounts = getAccounts()
  const account = accounts[index] || new AccountResponse()

  if (accounts.length === 0 && redirect === true)
    window.location.replace(_ + process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME_URL)

  return account
}
