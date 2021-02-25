/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericLog, LogReceive, ApiLogTraceRepo } from "./generic-log-strapi-protocols";

export class GenericLogStrapi implements GenericLog {
  private readonly apiLogTraceRepo: ApiLogTraceRepo;
  private readonly logDefault: LogReceive = {
    operation: "",
    isErr: true,
    description: "",
    stackTrace: ""
  };

  constructor(apiLogTraceRepo: ApiLogTraceRepo) {
    this.apiLogTraceRepo = apiLogTraceRepo;
  }

  async trace(log: LogReceive = this.logDefault): Promise<boolean> {
    try {
      const validLogReceive = this.normalizeLogReceive(log)
      const savedLog = await this.apiLogTraceRepo.saveLog(validLogReceive);

      return savedLog
    } catch {
      return false;
    }
  }

  normalizeLogReceive(log: any = this.logDefault): LogReceive {
    return {
      operation: typeof log.operation === "string" ? log.operation : this.logDefault.operation,
      isErr: typeof log.isErr === "boolean" ? log.isErr : this.logDefault.isErr,
      description: typeof log.description === "string" ? log.description : this.logDefault.description,
      stackTrace: typeof log.stackTrace === "string" ? log.stackTrace : this.logDefault.stackTrace,
    };
  }
}
