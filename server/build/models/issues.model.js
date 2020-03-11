"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("./base"));
const httpErrors_1 = require("../lib/httpErrors");
class Issue extends base_1.default {
    constructor() {
        const columns = {
            title: {
                colName: "title",
                validator: (val) => val && typeof val == "string"
            },
            id: {
                colName: "id",
                validator: (val) => val && typeof val == "number",
                isPrimaryKey: true
            },
            description: {
                colName: "description",
                validator: (val) => val && typeof val == "string" || true,
            },
            authorId: {
                colName: "author_id",
                validator: (val) => val && typeof val == "number",
            },
            projectId: {
                colName: "project_id",
                validator: (val) => val && typeof val == "number",
            }
        };
        super({ table: "issues", columns });
    }
    async create(issue) {
        if (!this.validate(issue, ["title", "description", "authorId", "projectId"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        var [columns, values, params] = this.parseColumnForCreateUpdate(issue);
        const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values);
        return result;
    }
    async update(issue, id) {
        if (!this.validate(issue, ["title", "description", "authorId", "projectId"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        await this.findById(id);
        const result = await this.pool.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [issue, issue.id]);
        return result;
    }
    async findAllByProjectId(projectId) {
        const result = await this.pool.query(`SELECT * from ${this.table} WHERE project_id = $1`, [projectId]);
        if (!result)
            throw new httpErrors_1.HTTP400Error("Record not found");
        return result;
    }
}
exports.default = Issue;
//# sourceMappingURL=issues.model.js.map