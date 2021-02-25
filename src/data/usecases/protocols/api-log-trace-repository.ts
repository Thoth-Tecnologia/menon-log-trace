/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiLogTraceRepo {
  saveLog(log: any): Promise<boolean>;
}
