"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trace_firebase_1 = require("./../../presentation/controllers/trace-firebase/trace-firebase");
const validate_payload_1 = require("../../presentation/helpers/validate-payload");
const trace_firebase_strapi_1 = require("../../data/usecases/trace-log/trace-firebase-strapi");
const trace_firebase_strapi_2 = require("../../infra/api/strapi/trace-firebase-strapi-repository/trace-firebase-strapi");
const api_helper_1 = __importDefault(require("../../infra/api/helper/api-helper"));
const makeTraceLogStrapiRepository = () => {
    return new trace_firebase_strapi_2.TraceFirebaseStrapiRepository(api_helper_1.default);
};
const makeTraceLogStrapi = () => {
    const traceFirebaseStrapiRepository = makeTraceLogStrapiRepository();
    return new trace_firebase_strapi_1.TraceFirebaseStrapi(traceFirebaseStrapiRepository);
};
exports.default = () => {
    const validatePayloadHelper = new validate_payload_1.ValidatePayloadHelper();
    const traceLogStrapi = makeTraceLogStrapi();
    return new trace_firebase_1.TraceFirebaseController(validatePayloadHelper, traceLogStrapi);
};
