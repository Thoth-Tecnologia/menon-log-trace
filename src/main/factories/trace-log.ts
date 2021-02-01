import { Controller } from "@presentation/controllers/protocols";
import { TraceFirebaseController } from "@presentation/controllers/trace-firebase/trace-firebase";
import { ValidatePayloadHelper } from "@presentation/helpers/validate-payload";
import { TraceFirebaseStrapi } from "@data/usecases/trace-log/trace-firebase-strapi";
import { TraceFirebaseStrapiRepository } from "@infra/api/strapi/trace-firebase-strapi-repository/trace-firebase-strapi";
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
