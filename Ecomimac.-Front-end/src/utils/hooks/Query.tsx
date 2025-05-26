import { Fetched, QueryOptions, RecordAndCounter } from "./Get"
import { create } from "zustand"

export enum SortOrder {
  ASC = 0,
  DESC = 1,
}

const INIT_PAGE = 1
const LIMIT_PER_PAGE = 8
const SORT_MODE = SortOrder.DESC

interface RefQueryValue {
  page: number | undefined
  limit: number | undefined

  searchColumns: string | undefined
  searchText: string | undefined

  sortColumn: string | undefined
  sortOrder: number | undefined
}

interface RefQueryFunction {
  updatePage(page: number): void
  updateLimit(limit: number): void

  updateSortColumn(columns: string, sortOrder: SortOrder): void
  updateSearch(text: string, column: string): void

  reset(): RefQueryValue
}

const initialValue: RefQueryValue = {
  page: INIT_PAGE,
  limit: LIMIT_PER_PAGE,

  searchColumns: undefined,
  searchText: undefined,

  sortColumn: undefined,
  sortOrder: SORT_MODE,
}

const refQuery = create<RefQueryValue & RefQueryFunction>((set) => ({
  ...initialValue,

  /**
   * Summary:
   *      UPdate column search text
   *
   * Returns:
   */
  updateSortColumn(column, sortOrder) {
    set({ sortColumn: column, sortOrder: sortOrder })
  },

  /**
   * Summary:
   *      Update page fetched records
   *
   * Returns:
   *
   */
  updatePage(page) {
    set({ page })
  },

  /**
   * Summary:
   *      Update limit record per page
   *
   * Returns:
   *
   */
  updateLimit(limit) {
    set({ limit })
  },

  /**
   * Summary:
   *      Update page fetched records
   *
   * Returns:
   *
   */
  updateSearch(text, column) {
    set({ searchText: text, searchColumns: column })
  },

  /**
   * Summary:
   *      Reset when reload components
   *
   * Returns:
   *
   */
  reset() {
    set(initialValue)
    return initialValue
  },
}))

class Query {
  constructor(
    updatePage: (page: number) => void,
    updateLimit: (limit: number) => void,
    updateSortColumn: (column: string, sortOrder?: SortOrder) => void,
    updateSearch: (text: string, column: string) => void,
    reset: () => void,
    options: QueryOptions
  ) {
    this.updateLimit = updateLimit
    this.updatePage = updatePage

    this.updateSortColumn = updateSortColumn
    this.updateSearch = updateSearch

    this.reset = reset
    this.options = options
  }

  updatePage: (page: number) => void
  updateLimit: (limit: number) => void
  updateSortColumn: (column: string, sortOrder?: SortOrder) => void
  updateSearch: (text: string, column: string) => void
  reset: () => void
  options: QueryOptions
}

export const useQuery = function <T>(
  fetched: Fetched<RecordAndCounter<T>>,
  silent: boolean = false
) {
  const state = refQuery()

  /**
   * Summary:
   *      Update page fetched records
   *
   * Returns:
   *
   */
  const updatePage = (page: number) => {
    state.updatePage(page)

    const options = new QueryOptions({
      searchColumns: state.searchColumns,
      limit: state.limit,
      page: page,
    })

    fetched.fetch({ params: options, silent })
  }

  /**
   * Summary:
   *      Update column fetched records
   *
   * Returns:
   *
   */
  const updateSortColumn = (
    column: string,
    sortOrder: SortOrder = SortOrder.DESC
  ) => {
    state.updateSortColumn(column, sortOrder)

    const options = new QueryOptions({
      limit: state.limit,
      page: state.page,
      sortOrder: sortOrder,
      sortColumn: column,
    })

    fetched.fetch({ params: options, silent })
  }

  /**
   * Summary:
   *      Update page fetched records
   *
   * Returns:
   *
   */
  const updateLimit = (limit: number) => {
    state.updateLimit(limit)

    const options = new QueryOptions({
      limit: limit,
      page: state.page,
    })

    fetched.fetch({ params: options, silent })
  }

  /**
   * Summary:
   *      Update search content records
   *
   * Returns:
   *
   */
  const updateSearch = (text: string, column: string) => {
    state.updateSearch(text, column)

    const options = new QueryOptions({
      searchColumns: column,
      searchText: text,
    })

    fetched.fetch({ params: options, silent })
  }

  /**
   * Summary:
   *      Reset all configure
   *
   * Returns:
   *
   */

  const reset = () => {
    const initial = state.reset()

    const options = new QueryOptions(initial)
    fetched.fetch({ params: options, silent })
  }

  /**
   * Summary:
   *      Query options
   *
   * Returns:
   *
   */
  const options = new QueryOptions(state)

  return new Query(
    updatePage,
    updateLimit,
    updateSortColumn,
    updateSearch,
    reset,
    options
  )
}
