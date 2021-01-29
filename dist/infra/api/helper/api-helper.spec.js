"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_helper_1 = __importDefault(require("./api-helper"));
describe("ApiHelper", () => {
    test("should be set baseUrl correctly", () => {
        api_helper_1.default.setBaseUrl("any_base_url");
        expect(api_helper_1.default.baseUrl).toEqual("any_base_url");
    });
});
