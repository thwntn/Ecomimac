import { Fetched, RecordAndCounter } from "@/utils/hooks"

const DEFAULT = 1

class Pagination {
  constructor(
    limit: number,
    total: number,
    current: number,
    onChange: (page: number, limit: number) => void
  ) {
    this.onChange = onChange
    this.limit = limit
    this.total = total
    this.current = current
  }

  /**
   * Summary:
   *    Limit record per page
   *
   * Returns:
   *
   */
  limit: number

  /**
   * Summary:
   *    Total page in database
   *
   * Returns:
   *
   */
  total: number

  /**
   * Summary:
   *    Current page active
   *
   * Returns:
   *
   */
  current: number

  /**
   * Summary:
   *    Action when change event change
   *
   * Returns:
   *
   */
  onChange: (page: number, limit: number) => void
}

export const mappingToPagination = function <T>(
  fetched: Fetched<RecordAndCounter<T>>,
  callback: (page: number, limit: number) => void
) {
  /**
   * Summary:
   *    Validate response is available
   *
   * Returns:
   *
   */
  const response = fetched.response
  if (!response) return new Pagination(DEFAULT, DEFAULT, DEFAULT, callback)

  /**
   * Summary:
   *    Pagination current record response
   *
   * Returns:
   *
   */
  return new Pagination(
    response.page.limit,
    response.page.total,
    response.page.current,
    callback
  )
}
