"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const projects_model_1 = tslib_1.__importDefault(require("../models/projects.model"));
const httpErrors_1 = require("../lib/httpErrors");
class Project extends projects_model_1.default {
    constructor(project = null) {
        super();
    }
    isValid(project) {
        if (project.name.length >= 100)
            throw new httpErrors_1.HTTP400Error("Project name limited to 100 characters");
    }
    async create(project) {
        this.isValid(project);
        return super.create(project);
    }
    async update(project, id) {
        this.isValid(project);
        return super.update(project, id);
    }
    async findAll() {
        return super.findAll();
    }
    async findById(projectId) {
        return super.findById(projectId);
    }
}
exports.default = Project;
//# sourceMappingURL=projects.service.js.map