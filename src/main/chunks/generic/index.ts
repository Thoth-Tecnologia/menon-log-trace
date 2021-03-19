/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadResponse } from "@presentation/controllers/protocols";
import makeGenericLogController from "../../factories/generic-log";
import { genericModule } from "@infra/api/helper/modules";

export default {
  setGenericLogEndpoint: (endpoint: string): void => genericModule().setEndpoint(endpoint),
  genericLog: (payload: any, endpoint?: string): Promise<PayloadResponse> => {
    if (endpoint && typeof endpoint === "string") genericModule().setEndpoint(endpoint)
    return makeGenericLogController().handle(payload)
  },
};
