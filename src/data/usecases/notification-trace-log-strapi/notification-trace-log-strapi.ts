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

  async trace(log: LogReceive = this.logDefault): Promise<boolean> {
    const treatedLog = this.treatLog(log);
    const savedLog = await this.apiLogTraceRepo.saveLog(treatedLog);

    return savedLog;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  treatLog(log: any = this.logDefault): LogReceive {
    const payloadTitleIsString = log.payload?.title === "string";
    const payloadBodyIsString = log.payload?.body === "string";

    return {
      operation: typeof log.operation === "string" ? log.operation : "",
      isErr: typeof log.isErr === "boolean" ? log.isErr : false,
      payload: {
        title: payloadTitleIsString ? log.payload.title : "",
        body: payloadBodyIsString ? log.payload.body : "",
      },
    };
  }
}
