"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceFirebaseController = void 0;
const responses_1 = require("../../helpers/responses");
class TraceFirebaseController {
    constructor(validatePayload, traceLog) {
        this.validatePayload = validatePayload;
        this.traceLog = traceLog;
        this.setHandlePayloadRequiredFields();
    }
    async handle(payload) {
        this.validatePayload.setPayload(payload);
        if (!this.validatePayload.containsAllRequiredFields()) {
            const missingFields = this.validatePayload.exibeMissingFields();
            const missingFieldsInPhrase = missingFields.join(", ");
            return responses_1.badRequest(`Property(s) ${missingFieldsInPhrase} is not provided`);
        }
        const responseTrace = await this.traceLog.trace(payload);
        return responseTrace ? responses_1.ok() : responses_1.badRequest("Log is not traced");
    }
    setHandlePayloadRequiredFields() {
        this.validatePayload.setRequiredFields(["operation", "isErr", "payload"]);
    }
}
exports.TraceFirebaseController = TraceFirebaseController;
