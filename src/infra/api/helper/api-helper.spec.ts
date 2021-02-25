import ApiHelper from "./api-helper";

describe("ApiHelper", () => {
  test("should be set baseUrl correctly", () => {
    ApiHelper.setBaseUrl("any_base_url");
    expect(ApiHelper.baseUrl).toEqual("any_base_url");
  });

  test("should be set setEndpoint correctly", () => {
    ApiHelper.setEndpoint("any_endpoint");
    expect(ApiHelper.endpoint).toEqual("/any_endpoint");
  });
});
