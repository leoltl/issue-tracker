"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("./base"));
const database_1 = tslib_1.__importDefault(require("../lib/database"));
const httpErrors_1 = require("../lib/httpErrors");
class Project extends base_1.default {
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
                validator: (val) => typeof val == "string",
            },
            authorId: {
                colName: "author_id",
                validator: (val) => val && typeof val == "number",
            },
        };
        super({ table: "projects", columns });
    }
    async create(issue) {
        if (!this.validate(issue, ["title", "description", "authorId"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        var [columns, values, params] = this.parseColumnForCreate(issue);
        const result = await database_1.default.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params})`, values);
        return result;
    }
    async update(project) {
        if (!this.validate(project, ["name", "id"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        const result = await database_1.default.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [project, project.id]);
        return result;
    }
    async destroy(id) {
    }
}
exports.default = Project;
//# sourceMappingURL=issues.model.js.map