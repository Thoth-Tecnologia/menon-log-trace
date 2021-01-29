"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_firebase_strapi_1 = require("./trace-firebase-strapi");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeFakeEntryLog = () => ({
    operation: "",
    isErr: false,
    payload: {
        title: "",
        body: "",
    },
});
const makeFakeTraceFirebaseStrapiRepo = () => {
    class FakeTraceFirebaseStrapiRepo {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async saveLog(log) {
            return new Promise((resolve) => resolve(true));
        }
    }
    return new FakeTraceFirebaseStrapiRepo();
};
const makeSut = () => {
    const fakeTraceFirebaseStrapiRepo = makeFakeTraceFirebaseStrapiRepo();
    const sut = new trace_firebase_strapi_1.TraceFirebaseStrapi(fakeTraceFirebaseStrapiRepo);
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
