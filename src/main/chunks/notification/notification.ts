/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiHelper from "@infra/api/helper/api-helper";
import { PayloadResponse } from "@presentation/controllers/protocols";
import makeNotificationTraceLogController from "./../../factories/trace-log";

export const notification = {
  setNotificationTraceLogEndpoint: (endpoint: string): void =>
    ApiHelper.setNotificationTraceLogEndpoint(endpoint),
  notificationTraceLog: (payload: any): Promise<PayloadResponse> =>
    makeNotificationTraceLogController().handle(payload),
};
