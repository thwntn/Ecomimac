import { useState } from "react"
import { create, prefixPathname } from "./Axios"
import { SnackbarMode, useSnackbar } from "@/utils/functions"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"

class Delete<T> {
  constructor(
    public isWait: boolean,
    public request: (options: DeleteOptions) => Promise<T>
  ) {}
}

interface DeleteOptions {
  pathname?: string
  params?: object
  silent?: boolean
  data?: unknown
}

export const useDelete = function <T = object>(
  pathname: string,
  body: object = {}
): Delete<T> {
  const [instance, snackbar] = [create(), useSnackbar()]
  const [isWait, updateWait] = useState<boolean>(false)

  const handler = function (response: unknown, silent: boolean | undefined) {
    const success = response as AxiosResponse
    if (success.status == HttpStatusCode.Ok) return success.data

    const error = response as AxiosError
    if (error.response)
      snackbar(SnackbarMode.error, String(error.response.data))

    return undefined
  }

  const request = async (options: DeleteOptions) => {
    options.silent === true || updateWait(true)

    let path = String(process.env.NEXT_PUBLIC_BACKEND).concat(
      prefixPathname(pathname)
    )
    if (options.pathname) path = path.concat(prefixPathname(options.pathname))

    return instance
      .delete<T>(path, {
        params: options.params,
        data: options.data || body,
      })
      .then((response) => handler(response, options.silent))
      .finally(() => updateWait(false))
  }

  return new Delete(isWait, request)
}
