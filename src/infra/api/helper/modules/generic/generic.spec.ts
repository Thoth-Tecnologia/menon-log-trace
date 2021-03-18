import { GenericModule } from "./generic";

const makeSut = () => {
  const sut = GenericModule.getInstance();

  return {
    sut
  }
}

describe("GenericModule", () => {
  afterAll(() => {
    const { sut } = makeSut();
    sut.setEndpoint("");
  });

  test("should be set setEndpoint correctly", () => {
    const { sut } = makeSut();
    sut.setEndpoint("any_endpoint");
    expect(sut.endpoint).toEqual("/any_endpoint");
  });
});
