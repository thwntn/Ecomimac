import { KabanResponse } from "."

export interface KabanCategoryResponse {
  id: string
  name: string
  kabans: KabanResponse[]
}
