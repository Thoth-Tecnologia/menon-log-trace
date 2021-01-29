"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePayloadHelper = void 0;
class ValidatePayloadHelper {
    setPayload(payload = {}) {
        const isNotObject = typeof payload !== "object" || payload === null;
        const proxiedPayload = !isNotObject ? payload : {};
        this.payload = Object.keys(proxiedPayload);
        return this;
    }
    setRequiredFields(requiredFields) {
        this.requiredFields = requiredFields;
        return this;
    }
    containsAllRequiredFields() {
        const missingRequiredFields = this.requiredFields.some((requiredField) => {
            return !this.payload.includes(requiredField);
        });
        return !missingRequiredFields;
    }
    exibeMissingFields() {
        const missingFields = this.requiredFields.filter((requiredField) => {
            return !this.payload.includes(requiredField);
        });
        return missingFields;
    }
}
exports.ValidatePayloadHelper = ValidatePayloadHelper;
