/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  PayloadResponse,
  ValidatePayload,
  NotificationTraceLog,
} from "./notification-trace-log-protocols";
import { badRequest, ok } from "../../helpers/responses";

export class NotificationTraceLogController implements Controller {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(payload: any): Promise<PayloadResponse> {
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
