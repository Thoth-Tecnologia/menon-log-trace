/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiHelper from "@infra/api/helper/api-helper";
import { PayloadResponse } from "@presentation/controllers/protocols";
import makeNotificationTraceLogController from "../../factories/notification-trace-log";

export default {
  setNotificationTraceLogEndpoint: (endpoint: string): void => ApiHelper.setEndpoint(endpoint),
  notificationTraceLog: (payload: any): Promise<PayloadResponse> => makeNotificationTraceLogController().handle(payload),
};
