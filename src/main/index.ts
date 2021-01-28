/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadResponse } from "../presentation/controllers/protocols";
import ApiHelper from "./../infra/api/helper/api-helper";
import makeTraceLogController from "./factories/trace-log";

export default {
  setBaseUrl: (url: string): void => ApiHelper.setBaseUrl(url),
  traceLogFirebase: (payload: any): Promise<PayloadResponse> =>
    makeTraceLogController().handle(payload),
};
