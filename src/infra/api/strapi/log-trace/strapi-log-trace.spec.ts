/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientProtocols } from "../../../../utils/http-client";
import { TraceFirebaseStrapiRepository } from "./strapi-log-trace";

const makeFakeApiHelper = (): any => ({
  baseUrl: "any.base.url",
});

const makeFakeHttpClient = (): any => {
  class FakeHttpClient implements HttpClientProtocols {
    async post(URI: string, data: any): Promise<any> {
      return new Promise((resolve) => resolve(data));
    }
    ok(): boolean {
      return true;
    }
  }

  return new FakeHttpClient();
};

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
  fakeHttpClient: HttpClientProtocols;
}

const makeSut = (): SutTypes => {
  const fakeApiHelper = makeFakeApiHelper();
  const fakeHttpClient = makeFakeHttpClient();
  const sut = new TraceFirebaseStrapiRepository(fakeApiHelper, fakeHttpClient);

  return {
    sut,
    fakeHttpClient,
  };
};

describe("TraceFirebaseStrapi Repository", () => {
  test("should be call axios instance with correct request values", async () => {
    const { sut, fakeHttpClient } = makeSut();

    const spyPostMethod = jest.spyOn(fakeHttpClient, "post");

    spyPostMethod.mockImplementation(
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

    expect(spyPostMethod).toHaveBeenCalledWith(
      makeFakeApiHelper().baseUrl,
      makeFakeEntryLog()
    );
  });

  test("should be returns false if axios dependecy Throws", async () => {
    const { sut, fakeHttpClient } = makeSut();

    const spyPostMethod = jest.spyOn(fakeHttpClient, "post");

    spyPostMethod.mockImplementation(
      () => new Promise((resolve, reject) => reject(new Error()))
    );
    const testableResponse = await sut.saveLog(makeFakeEntryLog());

    expect(testableResponse).toEqual(false);
  });
});
