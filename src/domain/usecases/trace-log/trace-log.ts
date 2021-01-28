import { Log } from './trace-log-protocols'

export interface TraceLog {
  trace(log: Log): Log
}
