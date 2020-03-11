"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const issues_model_1 = tslib_1.__importDefault(require("../models/issues.model"));
const httpErrors_1 = require("../lib/httpErrors");
class Issue extends issues_model_1.default {
    constructor(project = null) {
        super();
    }
    isValid(issue) {
        if (issue.title.length >= 100)
            throw new httpErrors_1.HTTP400Error("Issue title limited to 100 characters");
    }
    async create(issue) {
        this.isValid(issue);
        return super.create(issue);
    }
    async update(issue, id) {
        this.isValid(issue);
        return super.update(issue, id);
    }
    async findAll() {
        return super.findAll();
    }
    async findById(issueId) {
        return super.findById(issueId);
    }
    async findAllByProjectId(projectId) {
        return super.findAllByProjectId(projectId);
    }
}
exports.default = Issue;
//# sourceMappingURL=issues.service.js.map