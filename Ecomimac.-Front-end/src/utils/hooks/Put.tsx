import { useState } from "react"
import { create, prefixPathname } from "./Axios"
import { SnackbarMode, useSnackbar } from "@/utils/functions"
import { AxiosResponse, HttpStatusCode } from "axios"

class Options {
  pathname?: string
  params?: object
  silent?: boolean
}

export class Put<T = object> {
  constructor(
    public isWait: boolean,
    public request: (data: object, options?: Options) => Promise<T>
  ) {}
}

export const usePut = function <T = object>(pathname: string): Put<T> {
  const [instance, snackbar] = [create(), useSnackbar()]
  const [isWait, updateWait] = useState<boolean>(false)

  const handler = function (
    response: AxiosResponse<T>,
    silent: boolean | undefined
  ) {
    if (response.status == HttpStatusCode.Ok) {
      silent || snackbar(SnackbarMode.success)
      return response.data
    }

    snackbar(SnackbarMode.error)
    return response.data
  }

  const request = async function (data: object, options: Options = {}) {
    options.silent || updateWait(true)

    let path = String(process.env.NEXT_PUBLIC_BACKEND).concat(
      prefixPathname(pathname)
    )
    if (options.pathname) path = path.concat(prefixPathname(options.pathname))

    return instance
      .put<T>(path, data, options)
      .then((response) => handler(response, options.silent))
      .finally(() => options.silent || updateWait(false))
  }

  return new Put(isWait, request)
}
