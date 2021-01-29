"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.badRequest = exports.ok = void 0;
const ok = () => ({
    resultCode: 200,
    message: "Action has been succeded",
});
exports.ok = ok;
const badRequest = (message) => ({
    resultCode: 400,
    message,
});
exports.badRequest = badRequest;
const serverError = () => ({
    resultCode: 503,
    message: "Server error",
});
exports.serverError = serverError;
