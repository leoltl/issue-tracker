"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const projects_controller_1 = tslib_1.__importDefault(require("../controllers/projects.controller"));
const issues_controller_1 = tslib_1.__importDefault(require("../controllers/issues.controller"));
const router = express_1.default.Router();
router.get('/projects', projects_controller_1.default.getAll);
router.post('/projects', projects_controller_1.default.create);
router.put('/projects/:projectId', projects_controller_1.default.update);
router.get('/projects/:projectId', projects_controller_1.default.get);
router.get('/projects/:projectId/issues', issues_controller_1.default.getAll);
router.post('/projects/:projectId/issues', issues_controller_1.default.create);
router.get('/projects/:projectId/issues/:issueId', issues_controller_1.default.get);
router.put('/projects/:projectId/issues/:issueId', issues_controller_1.default.update);
exports.default = router;
//# sourceMappingURL=routes.js.map