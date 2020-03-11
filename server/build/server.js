"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
}
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const routes_1 = tslib_1.__importDefault(require("./routes/routes"));
const PORT = process.env.PORT || 3000;
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', routes_1.default);
const error_handler_1 = tslib_1.__importDefault(require("./middlewares/error-handler"));
const helpers_1 = require("./lib/helpers");
helpers_1.applyMiddleware(error_handler_1.default, app);
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map