interface IRecord {
  [key: string]: string
}

export interface ImportResponse {
  id: string
  parseRecord: IRecord
  dataId: string
  created: string
  updated: string
}
