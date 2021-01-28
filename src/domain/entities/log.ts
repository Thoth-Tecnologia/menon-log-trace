export interface LogPayload {
  title: string
  body: string
}

export interface Log {
  id: number
  operation: string
  isErr: boolean
  payload: LogPayload
  createdAt: Date
}
