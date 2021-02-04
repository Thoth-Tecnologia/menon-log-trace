/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NotificationTraceLog,
  LogReceive,
  ApiLogTraceRepo,
} from "./notification-trace-log-strapi-protocols";

export class NotificationTraceLogStrapi implements NotificationTraceLog {
  private readonly apiLogTraceRepo: ApiLogTraceRepo;
  private readonly logDefault: LogReceive = {
    operation: "",
    isErr: true,
    payload: {
      title: "",
      body: "",
    },
  };

  constructor(apiLogTraceRepo: ApiLogTraceRepo) {
    this.apiLogTraceRepo = apiLogTraceRepo;
  }

  async trace(log: any = this.logDefault): Promise<boolean> {
    try {
      const treatedLog = this.treatLog(log);
      const savedLog = await this.apiLogTraceRepo.saveLog(treatedLog);

      return savedLog;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  treatLog(log: any = this.logDefault): LogReceive {
    const payloadTitleIsString = log.payload?.title === "string";
    const payloadBodyIsString = log.payload?.body === "string";

    return {
      operation:
        typeof log.operation === "string"
          ? log.operation
          : this.logDefault.operation,
      isErr: typeof log.isErr === "boolean" ? log.isErr : this.logDefault.isErr,
      payload: {
        title: payloadTitleIsString
          ? log.payload.title
          : this.logDefault.payload.title,
        body: payloadBodyIsString
          ? log.payload.body
          : this.logDefault.payload.body,
      },
    };
  }
}
