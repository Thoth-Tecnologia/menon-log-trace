import {
  Controller,
  PayloadReceive,
  PayloadResponse,
  ValidatePayload,
} from "./trace-firebase-protocols";

export class TraceFirebaseController implements Controller {
  private readonly validatePayload: ValidatePayload;

  constructor(validatePayload: ValidatePayload) {
    this.validatePayload = validatePayload;
    this.setHandlePayloadRequiredFields();
  }

  private setHandlePayloadRequiredFields(): void {
    this.validatePayload.setRequiredFields(["operation", "isErr", "payload"]);
  }

  handle(payload: PayloadReceive): PayloadResponse {
    this.validatePayload.setPayload(payload);
    if (!this.validatePayload.containsAllRequiredFields()) {
      const missingFields = this.validatePayload
        .exibeMissingFields()
        .join(", ");

      return {
        resultCode: 400,
        message: `Property(s) ${missingFields} is not provided`,
      };
    }

    return {
      resultCode: 200,
      message: "",
    };
  }
}
