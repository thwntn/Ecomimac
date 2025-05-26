import { IconResponse } from "./Icon"

export class ExpenseTransactionResponse {
  id: string
  name: string
  description: string
  dateTime: string
  amount: number
  created: string
}

export class StatisticResponse {
  name: string
  value: number
}

export class ExpenditureResponse {
  name: string
  dateTime: string
  quantity: number
}
