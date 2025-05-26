import { ExpenseTransactionResponse } from "./ExpenseTransaction"
import { IconResponse } from "./Icon"

export interface ExpenseResponse {
  id: string
  name: string
  description: string
  dateTime: string
  created: string
  budget: number
  totalCost: number
  expenseTransactions: ExpenseTransactionResponse[]
}
