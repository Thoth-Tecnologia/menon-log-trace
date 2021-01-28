/* eslint-disable @typescript-eslint/no-explicit-any */
import { TraceFirebaseStrapiRepository } from "./trace-firebase-strapi";
import nodeFetch from "node-fetch";

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
  fakeNodeFetch: any;
  fakeApiHelper: any;
}

const makeSut = (): SutTypes => {
  const fakeNodeFetch = nodeFetch;
  const fakeApiHelper = makeFakeApiHelper();
  const sut = new TraceFirebaseStrapiRepository(fakeNodeFetch, fakeApiHelper);

  return {
    sut,
    fakeNodeFetch,
    fakeApiHelper,
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
});
