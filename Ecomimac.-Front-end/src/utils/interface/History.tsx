export interface HistoryStatusResponse {
  enum: number
  title: string
  description: string
  color: string
  backgroundColor: string
}

export interface HistoryResponse {
  contact: string
  sendingId: string
  name: string
  description: string
  created: string
  times: string
  status: number
}
