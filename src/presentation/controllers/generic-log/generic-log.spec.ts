import { GenericLogController } from "./generic-log"
import { LogReceive, GenericLog } from "./generic-log-protocols"
import { ValidatePayloadHelper } from "../../helpers/validate-payload";

const makeFakeRequest = (): LogReceive => ({
  operation: "any_operation",
  isErr: false,
  description: "any_description"
});

const makeGenericLogStub = (): GenericLog => {
  class GenericLogStub implements GenericLog {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async trace(log: LogReceive = makeFakeRequest()): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new GenericLogStub();
};

interface SutTypes {
  sut: GenericLogController,
  genericLogStub: GenericLog
}

const makeSut = (): SutTypes => {
  const genericLogStub = makeGenericLogStub()
  const validatePayloadHelper = new ValidatePayloadHelper();
  const sut = new GenericLogController(validatePayloadHelper, genericLogStub)

  return {
    sut,
    genericLogStub
  }
}

describe("Generic Log Controller", () => {
  test("should returns resultCode 400 if operation property is not provided", async () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      isErr: false,
    };

    expect(await sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) description is not provided",
    });
  });

  test("should returns resultCode 400 if operation and isErr property is not provided", async () => {
    const { sut } = makeSut();

    const testablePayload = {
      description: "any_description",
    };

    expect(await sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) operation, isErr is not provided",
    });
  });

  test("should call genericLogStub with correct values", () => {
    const { sut, genericLogStub } = makeSut();

    const traceSpy = jest.spyOn(genericLogStub, "trace");

    const fakeRequest = makeFakeRequest();
    sut.handle(fakeRequest);

    expect(traceSpy).toHaveBeenCalledWith(fakeRequest);
  });
})
