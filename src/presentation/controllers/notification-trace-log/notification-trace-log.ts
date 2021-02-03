import {
  Controller,
  PayloadReceive,
  PayloadResponse,
  ValidatePayload,
  NotificationTraceLog,
} from "./notification-trace-log-protocols";
import { badRequest, ok } from "../../helpers/responses";

export class TraceFirebaseController implements Controller {
  private readonly validatePayload: ValidatePayload;
  private readonly traceLog: NotificationTraceLog;

  constructor(
    validatePayload: ValidatePayload,
    traceLog: NotificationTraceLog
  ) {
    this.validatePayload = validatePayload;
    this.traceLog = traceLog;

    this.setHandlePayloadRequiredFields();
  }

  async handle(payload: PayloadReceive): Promise<PayloadResponse> {
    this.validatePayload.setPayload(payload);
    if (!this.validatePayload.containsAllRequiredFields()) {
      const missingFields = this.validatePayload.exibeMissingFields();
      const missingFieldsInPhrase = missingFields.join(", ");

      return badRequest(`Property(s) ${missingFieldsInPhrase} is not provided`);
    }

    const responseTrace = await this.traceLog.trace(payload);

    return responseTrace ? ok() : badRequest("Log is not traced");
  }

  private setHandlePayloadRequiredFields(): void {
    this.validatePayload.setRequiredFields(["operation", "isErr", "payload"]);
  }
}
