import {
  TraceLog,
  LogReceive,
  TraceFirebaseStrapiRepo,
} from "./trace-firebase-strapi-protocols";

export class TraceFirebaseStrapi implements TraceLog {
  private readonly TraceFirebaseStrapiRepo: TraceFirebaseStrapiRepo;
  private readonly logDefault = {
    operation: "",
    isErr: true,
    payload: {
      title: "",
      body: "",
    },
  };

  constructor(TraceFirebaseStrapiRepo: TraceFirebaseStrapiRepo) {
    this.TraceFirebaseStrapiRepo = TraceFirebaseStrapiRepo;
  }

  async trace(log: LogReceive = this.logDefault): Promise<boolean> {
    const treatedLog = this.treatLog(log);
    const savedLog = await this.TraceFirebaseStrapiRepo.saveLog(treatedLog);

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
