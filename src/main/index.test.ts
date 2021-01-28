import { PayloadReceive } from "../presentation/controllers/protocols";
import menonTraceLog from "./index";

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
  test("should be set correct url and request fake api", async () => {
    menonTraceLog.setBaseUrl("https://jsonplaceholder.typicode.com/posts");

    const defaultLog = makeDefaultLog();
    const testableTraceLog = await menonTraceLog.traceLogFirebase(defaultLog);

    expect(testableTraceLog).toEqual({
      resultCode: 200,
      message: "Action has been succeded",
    });
  });
});
