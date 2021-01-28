import { LogPayload } from './../../entities/log'
export { Log } from './../../entities/log'

export interface LogReceive {
  operation: string
  isErr: boolean
  payload: LogPayload
}
