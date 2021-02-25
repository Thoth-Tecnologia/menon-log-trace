import menonLogTrace from "./compose";

describe("Main Layer Integration", () => {
  test("should be contains global properties", () => {
    expect(menonLogTrace).toHaveProperty("setBaseUrl");
  });

  test("should be contains notification log properties", () => {
    expect(menonLogTrace).toHaveProperty("setNotificationTraceLogEndpoint");
    expect(menonLogTrace).toHaveProperty("notificationTraceLog");
  })

  test("should be contains generic log properties", () => {
    expect(menonLogTrace).toHaveProperty("setGenericLogEndpoint");
    expect(menonLogTrace).toHaveProperty("genericLog");
  })
});
