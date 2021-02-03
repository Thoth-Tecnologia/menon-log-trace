import { LogReceive } from "@domain/usecases/notification-trace-log";

export interface ApiLogTraceRepo {
  saveLog(log: LogReceive): Promise<boolean>;
}
