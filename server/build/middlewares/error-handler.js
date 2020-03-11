"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ErrorHandlers = tslib_1.__importStar(require("../lib/ErrorHandler"));
function handle404Error(router) {
    router.use((req, res) => {
        ErrorHandlers.notFoundError();
    });
}
;
function handleClientErrors(router) {
    router.use((err, req, res, next) => {
        ErrorHandlers.clientError(err, res, next);
    });
}
;
function handleServerErrors(router) {
    router.use((err, req, res, next) => {
        ErrorHandlers.serverError(err, res, next);
    });
}
;
exports.default = [handle404Error, handleClientErrors, handleServerErrors];
//# sourceMappingURL=error-handler.js.map