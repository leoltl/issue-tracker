"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const issues_service_1 = tslib_1.__importDefault(require("../services/issues.service"));
class IssueController {
    async getAll(req, res, next) {
        try {
            const { projectId } = req.params;
            const result = await (new issues_service_1.default()).findAllByProjectId(projectId);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
    async get(req, res, next) {
        try {
            const { issueId } = req.params;
            const result = await (new issues_service_1.default()).findById(issueId);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        const issue = { ...req.body, projectId: Number(req.params.id) };
        try {
            const result = await (new issues_service_1.default()).create(issue);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        const id = Number(req.params.id);
        const issue = { ...req.body, id };
        try {
            const result = await (new issues_service_1.default()).update(issue, id);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
}
const controller = new IssueController();
exports.default = controller;
//# sourceMappingURL=issues.controller.js.map