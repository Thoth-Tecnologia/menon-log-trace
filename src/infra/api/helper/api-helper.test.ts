import { ApiHelper } from "./api-helper";

interface SutTypes {
  sut: ApiHelper
}

const makeSut = (): SutTypes => {
  const sut = ApiHelper.getInstance();

  return {
    sut
  }
}

describe("ApiHelper", () => {
  test("should be set baseUrl correctly", () => {
    const { sut } = makeSut();
    sut.setBaseUrl("any_base_url");
    expect(sut.baseUrl).toEqual("any_base_url");
  });
});
