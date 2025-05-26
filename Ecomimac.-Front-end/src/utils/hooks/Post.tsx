import { useState } from "react"
import { create, prefixPathname } from "./Axios"
import { SnackbarMode, useSnackbar } from "@/utils/functions"
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from "axios"
import { ERROR_REQUEST_MESSAGE_DESCRIPTION } from "./_"

class Options {
  pathname?: string
  params?: object
  silent?: boolean
}

type Function<T> = (
  data: object,
  options?: Options & AxiosRequestConfig
) => Promise<T>

export class Post<T = object> {
  constructor(isWait: boolean, request: Function<T>, response: T) {
    this.isWait = isWait
    this.request = request
    this.response = response
  }
  public isWait: boolean
  public request: Function<T>
  public response: T | undefined
}

export const usePost = function <T = object>(pathname: string): Post<T> {
  const [response, update] = useState<undefined | T>(undefined)
  const [instance, snackbar] = [create(), useSnackbar()]
  const [isWait, updateWait] = useState<boolean>(false)

  const handler = function (response: unknown, silent: boolean | undefined) {
    const success = response as AxiosResponse
    if (
      success.status == HttpStatusCode.Ok ||
      success.status == HttpStatusCode.Created
    ) {
      snackbar(SnackbarMode.success)
      update(success.data)
      return success.data
    }

    const error = response as AxiosError
    if (error.response)
      snackbar(SnackbarMode.error, {
        title: error.response.data as string,
        description: ERROR_REQUEST_MESSAGE_DESCRIPTION,
      })

    return undefined
  }

  const request = async function (
    data: object,
    options: Options & AxiosRequestConfig = {}
  ) {
    options.silent || updateWait(true)

    let path = String(process.env.NEXT_PUBLIC_BACKEND).concat(
      prefixPathname(pathname)
    )
    if (options.pathname) path = path.concat(prefixPathname(options.pathname))

    return instance
      .post<T>(path, data, options)
      .then((response) => handler(response, options.silent))
      .finally(() => options.silent || updateWait(false))
  }

  return new Post(isWait, request, response)
}
