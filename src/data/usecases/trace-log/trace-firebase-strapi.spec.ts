import { TraceFirebaseStrapi } from "./trace-firebase-strapi";
import {
  LogReceive,
  TraceFirebaseStrapiRepo,
} from "./trace-firebase-strapi-protocols";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeFakeEntryLog = (): any => ({
  operation: "",
  isErr: false,
  payload: {
    title: "",
    body: "",
  },
});

const makeFakeTraceFirebaseStrapiRepo = (): TraceFirebaseStrapiRepo => {
  class FakeTraceFirebaseStrapiRepo {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async saveLog(log: LogReceive): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new FakeTraceFirebaseStrapiRepo();
};

interface SutTypes {
  sut: TraceFirebaseStrapi;
  fakeTraceFirebaseStrapiRepo: TraceFirebaseStrapiRepo;
}

const makeSut = (): SutTypes => {
  const fakeTraceFirebaseStrapiRepo = makeFakeTraceFirebaseStrapiRepo();
  const sut = new TraceFirebaseStrapi(fakeTraceFirebaseStrapiRepo);

  return {
    sut,
    fakeTraceFirebaseStrapiRepo,
  };
};

describe("TraceFirebaseStrapi", () => {
  test("should call treatLog with correct values", async () => {
    const { sut } = makeSut();

    const spyTreatLog = jest.spyOn(sut, "treatLog");

    const fakeEntryLog = makeFakeEntryLog();
    await sut.trace(fakeEntryLog);

    expect(spyTreatLog).toHaveBeenCalledWith(fakeEntryLog);
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

      expect(sut.treatLog(testableLog)).toEqual(makeFakeDefaultLog());
    });

    test("case payload", () => {
      const { sut } = makeSut();

      const testableLog = makeFakeEntryLog();
      testableLog.payload.title = 1;
      testableLog.payload.body = false;

      expect(sut.treatLog(testableLog)).toEqual(makeFakeDefaultLog());
    });
  });

  test("should call saveLog with correct values", async () => {
    const { sut, fakeTraceFirebaseStrapiRepo } = makeSut();

    const spyRepository = jest.spyOn(fakeTraceFirebaseStrapiRepo, "saveLog");

    const fakeEntryLog = makeFakeEntryLog();
    await sut.trace(fakeEntryLog);

    expect(spyRepository).toHaveBeenCalledWith(fakeEntryLog);
  });
});
