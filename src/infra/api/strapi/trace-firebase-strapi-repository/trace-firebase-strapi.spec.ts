/* eslint-disable @typescript-eslint/no-explicit-any */
import { TraceFirebaseStrapiRepository } from "./trace-firebase-strapi";

const makeFakeApiHelper = (): any => ({
  baseUrl: "any.base.url",
});

const makeFakeEntryLog = (): any => ({
  operation: "",
  isErr: false,
  payload: {
    title: "",
    body: "",
  },
});

interface SutTypes {
  sut: TraceFirebaseStrapiRepository;
}

const makeSut = (): SutTypes => {
  const fakeApiHelper = makeFakeApiHelper();
  const sut = new TraceFirebaseStrapiRepository(fakeApiHelper);

  return {
    sut,
  };
};

describe("TraceFirebaseStrapi Repository", () => {
  test("should be call fetch instance with correct request values", async () => {
    const { sut } = makeSut();

    const spyFetch = jest.spyOn(sut, "fetch");

    spyFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            ok() {
              return true;
            },
          })
        )
    );
    await sut.saveLog(makeFakeEntryLog());

    expect(spyFetch).toHaveBeenCalledWith(makeFakeApiHelper().baseUrl, {
      method: "POST",
      body: makeFakeEntryLog(),
    });
  });

  test("should be returns false if fetch dependecy Throws", async () => {
    const { sut } = makeSut();

    const spyFetch = jest.spyOn(sut, "fetch");

    spyFetch.mockImplementation(
      () => new Promise((resolve, reject) => reject(new Error()))
    );
    const testableResponse = await sut.saveLog(makeFakeEntryLog());

    expect(testableResponse).toEqual(false);
  });
});
