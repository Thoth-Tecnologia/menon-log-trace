import { ValidatePayload, PayloadReceive } from "./validate-payload-protocols";

export class ValidatePayloadUtil implements ValidatePayload {
  private readonly requiredFields: Array<string>;
  private payload: Array<string>;

  constructor(requiredFields: Array<string>) {
    this.requiredFields = requiredFields;
  }

  setPayload(payload: PayloadReceive = {}): ValidatePayload {
    const isNotObject = typeof payload !== "object" || payload === null;
    const proxiedPayload = !isNotObject ? payload : {};

    this.payload = Object.keys(proxiedPayload);

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
