import { IconResponse } from "./Icon"
import { ExpenseTransactionResponse } from "./ExpenseTransaction"
import { ProfileResponse } from "./Account"
import { TagResponse } from "./Tag"

export class ExpenseCategoryResponse {
  id: string
  name: string
  created: string
  description: string
  fromDate: string
  toDate: string
  profile: ProfileResponse
  expenseTransactionCategories: ExpenseCategoryResponse[]
  expenseCategoryTags: ExpenseCategoryTagResponse[]
}

export interface BannerResponse {
  used: number
  totalCost: number
  usable: number
  budget: number
}

export interface CounterExpenseCategoryResponse {
  totalCost: number
  quantity: number
  quantityTransaction: number
}

export interface ExpenseCategoryTagResponse {
  expenseCategory: ExpenseCategoryResponse
  tag: TagResponse
}
