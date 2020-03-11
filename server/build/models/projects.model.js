"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("./base"));
const httpErrors_1 = require("../lib/httpErrors");
class Project extends base_1.default {
    constructor() {
        const columns = {
            name: {
                colName: "name",
                validator: (val) => val && typeof val == "string"
            },
            id: {
                colName: "id",
                validator: (val) => val && typeof val == "number",
                isPrimaryKey: true
            }
        };
        super({ table: "projects", columns });
    }
    async create(project) {
        if (!this.validate(project, ["name"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        var [columns, values, params] = this.parseColumnForCreate(project);
        const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params})`, values);
        return result;
    }
    async update(project) {
        if (!this.validate(project, ["name", "id"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        const result = await this.pool.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [project.name, project.id]);
        return result;
    }
    async destroy(id) {
    }
}
exports.default = Project;
//# sourceMappingURL=projects.model.js.map