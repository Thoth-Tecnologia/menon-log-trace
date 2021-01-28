import { LogReceive, Log } from './trace-log-protocols'

export interface TraceLog {
  trace(log: LogReceive): Log
}
