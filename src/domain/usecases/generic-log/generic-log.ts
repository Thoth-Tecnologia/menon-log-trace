import { LogReceive } from "./generic-log-protocols";

export interface GenericLog {
  trace(log: LogReceive): Promise<boolean>;
}
