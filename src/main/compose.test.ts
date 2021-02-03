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
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  test("should be set correct url", () => {
    menonLogTrace.setBaseUrl(baseUrl);
    expect(ApiHelper.baseUrl).toEqual(baseUrl);
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
