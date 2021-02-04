import menonLogTrace from "./compose";

describe("Main Layer Integration", () => {
  test("should be contains all released properties", () => {
    expect(menonLogTrace).toHaveProperty("setBaseUrl");
    expect(menonLogTrace).toHaveProperty("setNotificationTraceLogEndpoint");
    expect(menonLogTrace).toHaveProperty("notificationTraceLog");
  });
});
