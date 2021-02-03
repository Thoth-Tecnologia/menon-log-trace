import { LogReceive } from "./notification-trace-log-protocols";

export interface NotificationTraceLog {
  trace(log: LogReceive): Promise<boolean>;
}
