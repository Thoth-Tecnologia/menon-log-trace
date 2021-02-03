import { Controller } from "@presentation/controllers/protocols";
import { NotificationTraceLogController } from "@presentation/controllers/notification-trace-log/notification-trace-log";
import { ValidatePayloadHelper } from "@presentation/helpers/validate-payload";
import { NotificationTraceLogStrapi } from "@data/usecases/notification-trace-log-strapi/notification-trace-log-strapi";
import { StrapiLogTraceRepository } from "@infra/api/strapi/log-trace";
import ApiHelper from "@infra/api/helper/api-helper";
import { HttpClient } from "@utils/http-client/http-client";

const makeTraceLogStrapiRepository = (): StrapiLogTraceRepository => {
  const httpClient = new HttpClient();
  return new StrapiLogTraceRepository(ApiHelper, httpClient);
};

const makeTraceLogStrapi = (): NotificationTraceLogStrapi => {
  const traceFirebaseStrapiRepository = makeTraceLogStrapiRepository();
  return new NotificationTraceLogStrapi(traceFirebaseStrapiRepository);
};

export default (): Controller => {
  const validatePayloadHelper = new ValidatePayloadHelper();
  const traceLogStrapi = makeTraceLogStrapi();
  return new NotificationTraceLogController(
    validatePayloadHelper,
    traceLogStrapi
  );
};
