import { useState } from "react"
import { create, prefixPathname } from "./Axios"
import { useEffectOnce } from "./Effect"
import { SnackbarMode, useSnackbar } from "@/utils/functions"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { SortOrder } from "./Query"

interface Params {
  page?: number
  limit?: number
  searchText?: string
  searchColumns?: string
  sortOrder?: SortOrder
  sortColumn?: string
}

export class QueryOptions {
  constructor(params: Params | undefined = undefined) {
    /**
     * Summary:
     *      Check condition initial value
     *
     * Returns:
     *
     */
    if (params === undefined) return

    /**
     * Summary:
     *      Search record in server
     *
     * Returns:
     *
     */
    this.searchColumns = params.searchColumns
    this.searchText = params.searchText

    /**
     * Summary:
     *      Pagination record in server
     *
     * Returns:
     *
     */
    this.limit = params.limit
    this.page = params.page

    /**
     * Summary:
     *      Sort record in server
     *
     * Returns:
     *
     */
    this.sortColumn = params.sortColumn
    this.sortOrder = params.sortOrder
  }

  /**
   * Summary:
   *      Current page property
   *
   * Returns:
   *
   */
  page: number | undefined = 1

  /**
   * Summary:
   *      Limit record per page
   *
   * Returns:
   *
   */
  limit: number | undefined = 8

  /**
   * Summary:
   *      Search content in record list
   *
   * Returns:
   *
   */
  searchText: string | undefined

  /**
   * Summary:
   *      Custom column search
   *
   * Returns:
   *
   */
  searchColumns: string | undefined

  /**
   * Summary:
   *      Custom column sort
   *
   * Returns:
   *
   */
  sortColumn: string | undefined

  /**
   * Summary:
   *      Custom column sort order
   *
   * Returns:
   *
   */
  sortOrder: SortOrder | undefined
}

export class RecordAndCounter<T> {
  data: Array<T>
  page: Page
}

export class Options {
  pathname?: string
  params?: object
  silent?: boolean
  initial?: boolean
}

export interface Page {
  total: number
  current: number
  limit: number
}

export interface Fetched<T = object> {
  response: undefined | T
  isWait: boolean
  fetch: (options?: Options) => Promise<T>
}

export const useGet = function <T = object>(
  pathname: string,
  options?: Options
): Fetched<T> {
  //
  //  Summary:
  //    Setup data default
  //
  //  Returns:
  //
  const initialize = options && options.initial === false
  const silent = options && options.silent === true

  //
  //  Summary:
  //    Hook state status data & loading
  //
  //  Returns:
  //
  const [response, update] = useState<undefined | T>(undefined)
  const [isWait, updateWait] = useState<boolean>(false)
  const snackbar = useSnackbar()

  const handler = function (response: unknown) {
    const success = response as AxiosResponse
    if (success.status == HttpStatusCode.Ok) {
      update(success.data)
      return success.data
    }

    const error = response as AxiosError
    if (error.response)
      snackbar(SnackbarMode.error, String(error.response.data))

    return undefined
  }

  const request = async function (options: Options = {}) {
    options.silent || updateWait(true)

    let path = String(process.env.NEXT_PUBLIC_BACKEND).concat(
      prefixPathname(pathname)
    )
    if (options.pathname) path = path.concat(prefixPathname(options.pathname))

    return create()
      .get<T>(path, {
        params: options.params,
      })
      .then((response) => handler(response))
      .finally(() => options.silent || updateWait(false))
  }

  useEffectOnce(() => void (initialize || request(options)))
  return { response, fetch: request, isWait }
}
