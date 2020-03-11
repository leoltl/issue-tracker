"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const projects_service_1 = tslib_1.__importDefault(require("../services/projects.service"));
class ProjectController {
    async getAll(req, res, next) {
        try {
            const result = await (new projects_service_1.default()).findAll();
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        const project = req.body;
        try {
            const result = await (new projects_service_1.default(project)).create(project);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        const project = { name: req.body.name, id: Number(req.params.id) };
        try {
            const result = await (new projects_service_1.default(project)).update(project);
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }
}
const controller = new ProjectController();
exports.default = controller;
//# sourceMappingURL=projects.controller.js.map