import { PayloadReceive } from "./../presentation/controllers/protocols";
import ApiHelper from "./../infra/api/helper/api-helper";
import menonLogTrace from "./compose";

jest.setTimeout(30000);

const makeDefaultLog = (): PayloadReceive => ({
  operation: "test_operation",
  isErr: false,
  payload: {
    title: "test_operation_title",
    body: "test_operation_body",
  },
});

describe("Main Layer Integration", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  test("should be set correct base url", () => {
    menonLogTrace.setBaseUrl(baseUrl);
    expect(ApiHelper.baseUrl).toEqual(baseUrl);
  });

  describe("should be trace notification log correctly", () => {
    afterAll(() => {
      menonLogTrace.setNotificationTraceLogEndpoint("");
    });

    test("should be set correct notification endpoint", () => {
      menonLogTrace.setNotificationTraceLogEndpoint("posts");
      expect(ApiHelper.notificationTraceLogEndpoint).toEqual("/posts");
    });

    test("should be request fake api", async () => {
      const defaultLog = makeDefaultLog();
      const testable = await menonLogTrace.notificationTraceLog(defaultLog);

      expect(testable).toEqual({
        resultCode: 200,
        message: "Action has been succeded",
      });
    });
  });
});
