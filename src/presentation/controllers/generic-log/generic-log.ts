import { Controller, PayloadResponse, PayloadReceive, ValidatePayload, GenericLog } from "./generic-log-protocols";
import { ok, badRequest } from "../../helpers/responses";

export class GenericLogController implements Controller {
  private readonly validatePayload: ValidatePayload;
  private readonly genericLog: GenericLog;

  constructor(validatePayload: ValidatePayload, genericLog: GenericLog) {
    this.validatePayload = validatePayload;
    this.genericLog = genericLog;

    this.setHandlePayloadRequiredFields();
  }

  async handle(payload: PayloadReceive): Promise<PayloadResponse> {
    this.validatePayload.setPayload(payload);
    if (!this.validatePayload.containsAllRequiredFields()) {
      const missingFields = this.validatePayload.exibeMissingFields();
      const missingFieldsInPhrase = missingFields.join(", ");

      return badRequest(`Property(s) ${missingFieldsInPhrase} is not provided`);
    }

    const responseTrace = await this.genericLog.trace(payload);

    return responseTrace ? ok() : badRequest("Log is not traced");
  }

  private setHandlePayloadRequiredFields(): void {
    this.validatePayload.setRequiredFields(["operation", "isErr", "description"]);
  }
}
