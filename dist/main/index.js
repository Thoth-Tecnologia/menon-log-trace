"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_helper_1 = __importDefault(require("./../infra/api/helper/api-helper"));
const trace_log_1 = __importDefault(require("./factories/trace-log"));
exports.default = {
    setBaseUrl: (url) => api_helper_1.default.setBaseUrl(url),
    traceLogFirebase: (payload) => trace_log_1.default().handle(payload),
};
