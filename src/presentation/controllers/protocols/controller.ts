import { LogReceive } from '../../../domain/usecases/trace-log/trace-log-protocols'

export interface LogPayload {
  title: string
  body: string
}

export type PayloadReceive = LogReceive

export interface PayloadResponse {
  resultCode: number
  message: string
}

export interface Controller {
  handle(payload: PayloadReceive): PayloadResponse
}
