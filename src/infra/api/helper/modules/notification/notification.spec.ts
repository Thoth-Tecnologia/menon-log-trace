import { NotificationModule } from "./notification";

const makeSut = () => {
  const sut = new NotificationModule();

  return {
    sut
  }
}

describe("NotificationModule", () => {
  test("should be set setEndpoint correctly", () => {
    const { sut } = makeSut();
    sut.setEndpoint("any_endpoint");
    expect(sut.endpoint).toEqual("/any_endpoint");
  });
});
