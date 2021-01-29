"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceFirebaseStrapi = void 0;
class TraceFirebaseStrapi {
    constructor(TraceFirebaseStrapiRepo) {
        this.logDefault = {
            operation: "",
            isErr: true,
            payload: {
                title: "",
                body: "",
            },
        };
        this.traceFirebaseStrapiRepo = TraceFirebaseStrapiRepo;
    }
    async trace(log = this.logDefault) {
        const treatedLog = this.treatLog(log);
        const savedLog = await this.traceFirebaseStrapiRepo.saveLog(treatedLog);
        return savedLog;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    treatLog(log = this.logDefault) {
        var _a, _b;
        const payloadTitleIsString = ((_a = log.payload) === null || _a === void 0 ? void 0 : _a.title) === "string";
        const payloadBodyIsString = ((_b = log.payload) === null || _b === void 0 ? void 0 : _b.body) === "string";
        return {
            operation: typeof log.operation === "string" ? log.operation : "",
            isErr: typeof log.isErr === "boolean" ? log.isErr : false,
            payload: {
                title: payloadTitleIsString ? log.payload.title : "",
                body: payloadBodyIsString ? log.payload.body : "",
            },
        };
    }
}
exports.TraceFirebaseStrapi = TraceFirebaseStrapi;
