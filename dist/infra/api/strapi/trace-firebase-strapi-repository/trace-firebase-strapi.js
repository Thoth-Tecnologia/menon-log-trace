"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceFirebaseStrapiRepository = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class TraceFirebaseStrapiRepository {
    constructor(apiHelper) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.fetch = node_fetch_1.default;
        this.apiHelper = apiHelper;
    }
    async saveLog(log) {
        try {
            const request = await this.fetch(this.apiHelper.baseUrl, {
                method: "POST",
                body: log,
            });
            return request.ok;
        }
        catch {
            return false;
        }
    }
}
exports.TraceFirebaseStrapiRepository = TraceFirebaseStrapiRepository;
