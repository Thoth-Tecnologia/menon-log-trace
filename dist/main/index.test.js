"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
jest.setTimeout(30000);
const makeDefaultLog = () => ({
    operation: "test_operation",
    isErr: false,
    payload: {
        title: "test_operation_title",
        body: "test_operation_body",
    },
});
describe("Main Layer Integration", () => {
    test("should be set correct url and request fake api", async () => {
        index_1.default.setBaseUrl("https://jsonplaceholder.typicode.com/posts");
        const defaultLog = makeDefaultLog();
        const testableTraceLog = await index_1.default.traceLogFirebase(defaultLog);
        expect(testableTraceLog).toEqual({
            resultCode: 200,
            message: "Action has been succeded",
        });
    });
});
