/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadResponse } from "@presentation/controllers/protocols";
import makeGenericLogController from "../../factories/generic-log";
import { GenericModule } from "@infra/api/helper/modules";

export default {
  setGenericLogEndpoint: (endpoint: string): void => GenericModule.getInstance().setEndpoint(endpoint),
  genericLog: (payload: any): Promise<PayloadResponse> => makeGenericLogController().handle(payload),
};
