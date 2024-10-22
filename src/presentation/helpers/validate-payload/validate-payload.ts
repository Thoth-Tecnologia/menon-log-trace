import { ValidatePayload, PayloadReceive } from "./validate-payload-protocols";

export class ValidatePayloadHelper implements ValidatePayload {
  private requiredFields: Array<string>;
  private payload: Array<string>;

  setPayload(payload: PayloadReceive = {}): ValidatePayload {
    const isNotObject = typeof payload !== "object" || payload === null;
    const proxiedPayload = !isNotObject ? payload : {};

    this.payload = Object.keys(proxiedPayload);

    return this;
  }

  setRequiredFields(requiredFields: Array<string>): ValidatePayload {
    this.requiredFields = requiredFields;

    return this;
  }

  containsAllRequiredFields(): boolean {
    const missingRequiredFields = this.requiredFields.some((requiredField) => {
      return !this.payload.includes(requiredField);
    });

    return !missingRequiredFields;
  }

  exibeMissingFields(): Array<string> {
    const missingFields = this.requiredFields.filter((requiredField) => {
      return !this.payload.includes(requiredField);
    });

    return missingFields;
  }
}
