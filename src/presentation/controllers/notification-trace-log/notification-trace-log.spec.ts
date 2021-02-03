import { NotificationTraceLogController } from "./notification-trace-log";
import { ValidatePayloadHelper } from "../../helpers/validate-payload";
import {
  NotificationTraceLog,
  LogReceive,
} from "./notification-trace-log-protocols";

const makeFakeRequest = (): LogReceive => ({
  operation: "any_operation",
  isErr: false,
  payload: {
    title: "any_title",
    body: "any_body",
  },
});

const makeNotificationTraceLogStub = (): NotificationTraceLog => {
  class NotificationTraceLogStub implements NotificationTraceLog {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async trace(log: LogReceive = makeFakeRequest()): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new NotificationTraceLogStub();
};

interface SutTypes {
  sut: NotificationTraceLogController;
  notificationTraceLogStub: NotificationTraceLog;
}

const makeSut = (): SutTypes => {
  const notificationTraceLogStub = makeNotificationTraceLogStub();
  const validatePayloadHelper = new ValidatePayloadHelper();
  const sut = new NotificationTraceLogController(
    validatePayloadHelper,
    notificationTraceLogStub
  );

  return {
    sut,
    notificationTraceLogStub,
  };
};

describe("TraceFirebase Controller", () => {
  it("should returns resultCode 400 if operation property is not provided", async () => {
    const { sut } = makeSut();

    const testablePayload = {
      isErr: false,
      payload: {},
    };

    expect(await sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) operation is not provided",
    });
  });

  it("should returns resultCode 400 if irErr property is not provided", async () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      payload: {},
    };

    expect(await sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) isErr is not provided",
    });
  });

  it("should returns resultCode 400 if payload property is not provided", async () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
      isErr: false,
    };

    expect(await sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) payload is not provided",
    });
  });

  it("should returns resultCode 400 if payload and isErr property is not provided", async () => {
    const { sut } = makeSut();

    const testablePayload = {
      operation: "any_operation",
    };

    expect(await sut.handle(testablePayload)).toEqual({
      resultCode: 400,
      message: "Property(s) isErr, payload is not provided",
    });
  });

  it("should call notificationTraceLogStub with correct values", () => {
    const { sut, notificationTraceLogStub } = makeSut();

    const traceSpy = jest.spyOn(notificationTraceLogStub, "trace");

    const fakeRequest = makeFakeRequest();
    sut.handle(fakeRequest);

    expect(traceSpy).toHaveBeenCalledWith(fakeRequest);
  });
});
