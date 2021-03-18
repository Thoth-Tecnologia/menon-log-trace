import { NotificationLog } from "@domain/entities/notification-log";
import { GenericLog } from "@domain/entities/generic-log";
import { ApiHelper } from "@infra/api/helper";
import { GenericModule, NotificationModule } from "@infra/api/helper/modules";
import menonLogTrace from "./compose";

jest.setTimeout(30000);

const apiHelper = ApiHelper.getInstance();
const genericModule = GenericModule.getInstance();
const notificationModule = NotificationModule.getInstance();

describe("Main Layer Integration", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  test("should be set correct base url", () => {
    menonLogTrace.setBaseUrl(baseUrl);
    expect(apiHelper.baseUrl).toEqual(baseUrl);
  });

  describe("should be trace notification log correctly", () => {
    const makeNotificationDefaultLog = (): NotificationLog => ({
      operation: "test_operation",
      isErr: false,
      payload: {
        title: "test_operation_title",
        body: "test_operation_body",
      },
    });

    afterAll(() => {
      menonLogTrace.setNotificationTraceLogEndpoint("");
    });

    test("should be set correct endpoint", () => {
      menonLogTrace.setNotificationTraceLogEndpoint("posts");
      expect(notificationModule.endpoint).toEqual("/posts");
    });

    test("should be request fake api", async () => {
      const defaultLog = makeNotificationDefaultLog();
      const testable = await menonLogTrace.notificationTraceLog(defaultLog);

      expect(testable).toEqual({
        resultCode: 200,
        message: "Action has been succeded",
      });
    });
  });

  describe("should be registrr generic log correctly", () => {
    const makeGenericDefaultLog = (): GenericLog => ({
      operation: "test_operation",
      isErr: false,
      description: "",
    });

    afterAll(() => {
      menonLogTrace.setGenericLogEndpoint("");
    });

    test("should be set correct endpoint", () => {
      menonLogTrace.setGenericLogEndpoint("posts");
      expect(genericModule.endpoint).toEqual("/posts");
    });

    test("should be request fake api", async () => {
      const defaultLog = makeGenericDefaultLog();
      const testable = await menonLogTrace.genericLog(defaultLog);

      expect(testable).toEqual({
        resultCode: 200,
        message: "Action has been succeded",
      });
    });
  });
});
