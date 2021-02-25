/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiHelper from "@infra/api/helper/api-helper";
import { PayloadResponse } from "@presentation/controllers/protocols";
import makeGenericLogController from "../../factories/generic-log";

export default {
  setGenericLogEndpoint: (endpoint: string): void => ApiHelper.setEndpoint(endpoint),
  genericLog: (payload: any): Promise<PayloadResponse> => makeGenericLogController().handle(payload),
};
