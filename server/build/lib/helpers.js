"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = (middlewareWrappers, router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
//# sourceMappingURL=helpers.js.map