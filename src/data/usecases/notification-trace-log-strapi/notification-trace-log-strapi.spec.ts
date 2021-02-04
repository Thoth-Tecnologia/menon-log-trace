import { NotificationTraceLogStrapi } from "./notification-trace-log-strapi";
import {
  LogReceive,
  ApiLogTraceRepo,
} from "./notification-trace-log-strapi-protocols";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeFakeEntryLog = (): any => ({
  operation: "",
  isErr: false,
  payload: {
    title: "",
    body: "",
  },
});

const makeFakeApiLogTraceRepo = (): ApiLogTraceRepo => {
  class fakeApiLogTraceRepo {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async saveLog(log: LogReceive): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new fakeApiLogTraceRepo();
};

interface SutTypes {
  sut: NotificationTraceLogStrapi;
  fakeApiLogTraceRepo: ApiLogTraceRepo;
}

const makeSut = (): SutTypes => {
  const fakeApiLogTraceRepo = makeFakeApiLogTraceRepo();
  const sut = new NotificationTraceLogStrapi(fakeApiLogTraceRepo);

  return {
    sut,
    fakeApiLogTraceRepo,
  };
};

describe("NotificationTraceLogStrapi", () => {
  test("should call treatLog with correct values", async () => {
    const { sut } = makeSut();

    const spyNormalizeLogReceive = jest.spyOn(sut, "normalizeLogReceive");

    const fakeEntryLog = makeFakeEntryLog();
    await sut.trace(fakeEntryLog);

    expect(spyNormalizeLogReceive).toHaveBeenCalledWith(fakeEntryLog);
  });

  describe("should be formatted Log received with default values if it does not contain", () => {
    const makeFakeDefaultLog = () => ({
      operation: "",
      isErr: false,
      payload: {
        title: "",
        body: "",
      },
    });

    test("case operation", () => {
      const { sut } = makeSut();

      const testableLog = makeFakeEntryLog();
      testableLog.operation = 1;

      expect(sut.normalizeLogReceive(testableLog)).toEqual(
        makeFakeDefaultLog()
      );
    });

    test("case payload", () => {
      const { sut } = makeSut();

      const testableLog = makeFakeEntryLog();
      testableLog.payload.title = 1;
      testableLog.payload.body = false;

      expect(sut.normalizeLogReceive(testableLog)).toEqual(
        makeFakeDefaultLog()
      );
    });
  });

  test("should call saveLog with correct values", async () => {
    const { sut, fakeApiLogTraceRepo } = makeSut();

    const spyRepository = jest.spyOn(fakeApiLogTraceRepo, "saveLog");

    const fakeEntryLog = makeFakeEntryLog();
    await sut.trace(fakeEntryLog);

    expect(spyRepository).toHaveBeenCalledWith(fakeEntryLog);
  });

  test("should be not throw new exception if repository throws", async () => {
    const { sut, fakeApiLogTraceRepo } = makeSut();

    const spySaveLog = jest.spyOn(fakeApiLogTraceRepo, "saveLog");
    spySaveLog.mockImplementation(
      () => new Promise((resolve, reject) => reject(new Error()))
    );

    const fakeEntryLog = makeFakeEntryLog();
    const testable = await sut.trace(fakeEntryLog);

    expect(testable).toBe(false);
  });
});
