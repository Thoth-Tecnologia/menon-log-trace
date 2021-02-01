import { LogReceive } from "@domain/usecases/trace-log";

export interface TraceFirebaseStrapiRepo {
  saveLog(log: LogReceive): Promise<boolean>;
}
