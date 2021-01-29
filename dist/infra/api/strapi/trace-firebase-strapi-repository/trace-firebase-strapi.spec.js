"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const trace_firebase_strapi_1 = require("./trace-firebase-strapi");
const makeFakeApiHelper = () => ({
    baseUrl: "any.base.url",
});
const makeFakeEntryLog = () => ({
    operation: "",
    isErr: false,
    payload: {
        title: "",
        body: "",
    },
});
const makeSut = () => {
    const fakeApiHelper = makeFakeApiHelper();
    const sut = new trace_firebase_strapi_1.TraceFirebaseStrapiRepository(fakeApiHelper);
    return {
        sut,
    };
};
describe("TraceFirebaseStrapi Repository", () => {
    test("should be call fetch instance with correct request values", async () => {
        const { sut } = makeSut();
        const spyFetch = jest.spyOn(sut, "fetch");
        spyFetch.mockImplementation(() => new Promise((resolve) => resolve({
            ok() {
                return true;
            },
        })));
        await sut.saveLog(makeFakeEntryLog());
        expect(spyFetch).toHaveBeenCalledWith(makeFakeApiHelper().baseUrl, {
            method: "POST",
            body: makeFakeEntryLog(),
        });
    });
    test("should be returns false if fetch dependecy Throws", async () => {
        const { sut } = makeSut();
        const spyFetch = jest.spyOn(sut, "fetch");
        spyFetch.mockImplementation(() => new Promise((resolve, reject) => reject(new Error())));
        const testableResponse = await sut.saveLog(makeFakeEntryLog());
        expect(testableResponse).toEqual(false);
    });
});
