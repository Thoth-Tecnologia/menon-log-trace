import { LogReceive } from "@src/domain/usecases/notification-trace-log";

export interface TraceFirebaseStrapiRepo {
  saveLog(log: LogReceive): Promise<boolean>;
}
