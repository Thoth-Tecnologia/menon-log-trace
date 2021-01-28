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
    this.setHandleRequiredFields();
  }

  private setHandleRequiredFields(): void {
    this.validatePayload.setRequiredFields(["operation", "isErr", "payload"]);
  }

  handle(payload: PayloadReceive): PayloadResponse {
    const missingRequiredFields = !this.validatePayload
      .setPayload(payload)
      .containsAllRequiredFields();
    if (missingRequiredFields)
      return {
        resultCode: 400,
        message: `Property(s) ${this.validatePayload
          .exibeMissingFields()
          .join(", ")} is not provided`,
      };

    return {
      resultCode: 200,
      message: "",
    };
  }
}
