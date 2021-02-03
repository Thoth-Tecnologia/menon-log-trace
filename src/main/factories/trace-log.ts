import { Controller } from "@presentation/controllers/protocols";
import { TraceFirebaseController } from "@presentation/controllers/notification-trace-log/notification-trace-log";
import { ValidatePayloadHelper } from "@presentation/helpers/validate-payload";
import { NotificationTraceLogStrapi } from "@data/usecases/notification-trace-log-strapi/notification-trace-log-strapi";
import { TraceFirebaseStrapiRepository } from "@infra/api/strapi/strapi-log-trace/strapi-log-trace";
import ApiHelper from "@infra/api/helper/api-helper";
import { HttpClient } from "@utils/http-client/http-client";

const makeTraceLogStrapiRepository = (): TraceFirebaseStrapiRepository => {
  const httpClient = new HttpClient();
  return new TraceFirebaseStrapiRepository(ApiHelper, httpClient);
};

const makeTraceLogStrapi = (): NotificationTraceLogStrapi => {
  const traceFirebaseStrapiRepository = makeTraceLogStrapiRepository();
  return new NotificationTraceLogStrapi(traceFirebaseStrapiRepository);
};

export default (): Controller => {
  const validatePayloadHelper = new ValidatePayloadHelper();
  const traceLogStrapi = makeTraceLogStrapi();
  return new TraceFirebaseController(validatePayloadHelper, traceLogStrapi);
};
