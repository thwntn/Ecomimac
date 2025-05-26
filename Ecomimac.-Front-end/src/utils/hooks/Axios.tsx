import axios, { AxiosError, AxiosInstance } from "axios"
import { useAccount } from "./Account"

export const prefixPathname = (pathname: string) => "/" + pathname

export const create = function (): AxiosInstance {
  const account = useAccount(false)
  const instance = axios.create({
    headers: {
      Authorization: "Bearer " + account.token,
    },
  })

  instance.interceptors.response.use(
    (value) => value,
    (error: AxiosError) => {
      error.response &&
        error.response.status == 401 &&
        window.location.replace(
          String(process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME_URL)
        )
      return error
    }
  )

  return instance
}
