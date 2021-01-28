import { LogReceive } from "./trace-log-protocols";

export interface TraceLog {
  trace(log: LogReceive): Promise<boolean>;
}
