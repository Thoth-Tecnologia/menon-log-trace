import { TraceFirebaseController } from "./trace-firebase";
import { ValidatePayloadUtil } from "./../../utils/validate-payload";

interface SutTypes {
  sut: TraceFirebaseController;
}

const makeSut = (): SutTypes => {
  const validatePayloadUtil = new ValidatePayloadUtil();
  const sut = new TraceFirebaseController(validatePayloadUtil);

  return {
    sut,
  };
};

describe("TraceFirebase Controller", () => {
  it("should returns resultCode 400 if operation property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      isErr: false,
      payload: {},
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) operation is not provided",
    });
  });

  it("should returns resultCode 400 if irErr property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      payload: {},
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) isErr is not provided",
    });
  });

  it("should returns resultCode 400 if payload property is not provided", () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      isErr: false,
    };

    expect(sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) payload is not provided",
    });
  });
});
