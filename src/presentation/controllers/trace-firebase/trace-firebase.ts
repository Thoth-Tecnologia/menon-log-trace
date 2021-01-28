import {
  Controller,
  PayloadReceive,
  PayloadResponse,
  ValidatePayload,
} from "./trace-firebase-protocols";
import { badRequest, ok } from "../../helpers/responses";

export class TraceFirebaseController implements Controller {
  private readonly validatePayload: ValidatePayload;

  constructor(validatePayload: ValidatePayload) {
    this.validatePayload = validatePayload;
    this.setHandlePayloadRequiredFields();
  }

  handle(payload: PayloadReceive): PayloadResponse {
    this.validatePayload.setPayload(payload);
    if (!this.validatePayload.containsAllRequiredFields()) {
      const missingFields = this.validatePayload
        .exibeMissingFields()
        .join(", ");

      return badRequest(`Property(s) ${missingFields} is not provided`);
    }

    return ok();
  }

  private setHandlePayloadRequiredFields(): void {
    this.validatePayload.setRequiredFields(["operation", "isErr", "payload"]);
  }
}
