"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const projects_controller_1 = tslib_1.__importDefault(require("../controllers/projects.controller"));
const router = express_1.default.Router();
router.get('/projects', projects_controller_1.default.getAll);
router.post('/projects', projects_controller_1.default.create);
router.put('/projects/:id', projects_controller_1.default.update);
exports.default = router;
//# sourceMappingURL=routes.js.map