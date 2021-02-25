import { GenericLogStrapi } from "./generic-log-strapi"
import { LogReceive, ApiLogTraceRepo } from "./generic-log-strapi-protocols";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeFakeEntryLog = (): any => ({
  operation: "",
  isErr: false,
  description: "",
  stackTrace: ""
});

const makeFakeApiLogTraceRepo = (): ApiLogTraceRepo => {
  class fakeApiLogTraceRepo implements ApiLogTraceRepo {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async saveLog(log: LogReceive): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new fakeApiLogTraceRepo();
};

interface SutTypes {
  sut: GenericLogStrapi;
  fakeApiLogTraceRepo: ApiLogTraceRepo;
}

const makeSut = (): SutTypes => {
  const fakeApiLogTraceRepo = makeFakeApiLogTraceRepo();
  const sut = new GenericLogStrapi(fakeApiLogTraceRepo)

  return {
    sut,
    fakeApiLogTraceRepo,
  }
}

describe("GenericLogStrapi", () => {
  test("should call normalizeLogReceive with correct values", async () => {
    const { sut } = makeSut();

    const spyNormalizeLogReceive = jest.spyOn(sut, "normalizeLogReceive");

    const fakeEntryLog = makeFakeEntryLog();
    await sut.trace(fakeEntryLog);

    expect(spyNormalizeLogReceive).toHaveBeenCalledWith(fakeEntryLog);
  })

  describe("should be formatted Log received with default values if it does not contain", () => {
    const makeFakeDefaultLog = (): LogReceive => ({
      operation: "",
      isErr: true,
      description: "",
      stackTrace: ""
    });

    test("case operation", () => {
      const { sut } = makeSut();

      const testableLog = makeFakeEntryLog();
      testableLog.operation = 1;

      expect(sut.normalizeLogReceive(testableLog)).toEqual(makeFakeEntryLog());
    });

    test("case description", () => {
      const { sut } = makeSut();

      const testableLog = makeFakeEntryLog();
      testableLog.description = 1

      expect(sut.normalizeLogReceive(testableLog)).toEqual(makeFakeEntryLog());
    });

    test("case correctly description and wrong isErr", () => {
      const { sut } = makeSut();

      const testableLog = makeFakeEntryLog();
      testableLog.isErr = null;
      testableLog.description = "any_description"

      expect(sut.normalizeLogReceive(testableLog)).toEqual({
        ...makeFakeDefaultLog(),
        description: "any_description",
      });
    });
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
})
