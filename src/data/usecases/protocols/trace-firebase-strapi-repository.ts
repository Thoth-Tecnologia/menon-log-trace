import { Log, LogReceive } from "../../../domain/usecases/trace-log";

export interface TraceFirebaseStrapiRepository {
  saveLog(log: LogReceive): Promise<Log>;
}
