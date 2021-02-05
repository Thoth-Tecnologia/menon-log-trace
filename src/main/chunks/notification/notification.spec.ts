import notification from ".";

describe("Notification Chunk", () => {
  test("should be ensure notification chunk contains all properties", () => {
    expect(notification).toHaveProperty("setNotificationTraceLogEndpoint");
    expect(notification).toHaveProperty("notificationTraceLog");
  });
});
