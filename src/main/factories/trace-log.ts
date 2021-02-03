import { Controller } from "@presentation/controllers/protocols";
import { TraceFirebaseController } from "@src/presentation/controllers/notification-trace-log/notification-trace-log";
import { ValidatePayloadHelper } from "@presentation/helpers/validate-payload";
import { TraceFirebaseStrapi } from "@src/data/usecases/notification-trace-log-strapi/notification-trace-log-strapi";
import { TraceFirebaseStrapiRepository } from "@src/infra/api/strapi/strapi-log-trace/strapi-log-trace";
import ApiHelper from "@infra/api/helper/api-helper";
import { HttpClient } from "@utils/http-client/http-client";

const makeTraceLogStrapiRepository = (): TraceFirebaseStrapiRepository => {
  const httpClient = new HttpClient();
  return new TraceFirebaseStrapiRepository(ApiHelper, httpClient);
};

const makeTraceLogStrapi = (): TraceFirebaseStrapi => {
  const traceFirebaseStrapiRepository = makeTraceLogStrapiRepository();
  return new TraceFirebaseStrapi(traceFirebaseStrapiRepository);
};

export default (): Controller => {
  const validatePayloadHelper = new ValidatePayloadHelper();
  const traceLogStrapi = makeTraceLogStrapi();
  return new TraceFirebaseController(validatePayloadHelper, traceLogStrapi);
};
