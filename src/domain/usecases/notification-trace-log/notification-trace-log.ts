import { LogReceive } from "./notification-trace-log-protocols";

export interface TraceLog {
  trace(log: LogReceive): Promise<boolean>;
}
