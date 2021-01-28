import {
  Controller,
  PayloadReceive,
  PayloadResponse,
  ValidatePayload,
  TraceLog,
} from "./trace-firebase-protocols";
import { badRequest, ok } from "../../helpers/responses";

export class TraceFirebaseController implements Controller {
  private readonly validatePayload: ValidatePayload;
  private readonly traceLog: TraceLog;

  constructor(validatePayload: ValidatePayload, traceLog: TraceLog) {
    this.validatePayload = validatePayload;
    this.traceLog = traceLog;

    this.setHandlePayloadRequiredFields();
  }

  handle(payload: PayloadReceive): PayloadResponse {
    this.validatePayload.setPayload(payload);
    if (!this.validatePayload.containsAllRequiredFields()) {
      const missingFields = this.validatePayload.exibeMissingFields();
      const missingFieldsInPhrase = missingFields.join(", ");

      return badRequest(`Property(s) ${missingFieldsInPhrase} is not provided`);
    }

    this.traceLog.trace(payload);

    return ok();
  }

  private setHandlePayloadRequiredFields(): void {
    this.validatePayload.setRequiredFields(["operation", "isErr", "payload"]);
  }
}
