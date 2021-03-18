import { Controller } from "@presentation/controllers/protocols";
import { NotificationTraceLogController } from "@presentation/controllers/notification-trace-log";
import { ValidatePayloadHelper } from "@presentation/helpers/validate-payload";
import { NotificationTraceLogStrapi } from "@data/usecases/notification-trace-log-strapi";
import { StrapiLogTraceRepository } from "@infra/api/strapi/log-trace";
import { makeApiHelper } from "@infra/api/helper/api-helper";
import { notificationModule } from "@infra/api/helper/modules";
import { HttpClient } from "@utils/http-client/http-client";

const makeStrapiLogTraceRepository = (): StrapiLogTraceRepository => {
  const apiHelper = makeApiHelper(notificationModule());
  const httpClient = new HttpClient();
  return new StrapiLogTraceRepository(apiHelper, httpClient);
};

const makeNotificationTraceLogStrapi = (): NotificationTraceLogStrapi => {
  const strapiLogTraceRepository = makeStrapiLogTraceRepository();
  return new NotificationTraceLogStrapi(strapiLogTraceRepository);
};

export default (): Controller => {
  const validatePayloadHelper = new ValidatePayloadHelper();
  const notificationTraceLogStrapi = makeNotificationTraceLogStrapi();
  return new NotificationTraceLogController(
    validatePayloadHelper,
    notificationTraceLogStrapi
  );
};
