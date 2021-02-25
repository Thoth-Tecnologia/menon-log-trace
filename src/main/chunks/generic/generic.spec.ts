import generic from ".";

describe("Generic Chunk", () => {
  test("should be ensure generic chunk contains all properties", () => {
    expect(generic).toHaveProperty("setGenericLogEndpoint");
    expect(generic).toHaveProperty("genericLog");
  });
});
