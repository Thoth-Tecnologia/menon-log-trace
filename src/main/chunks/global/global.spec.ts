import global from ".";

describe("Global Chunk", () => {
  test("should be ensure global chunk contains all properties", () => {
    expect(global).toHaveProperty("setBaseUrl");
  });
});
