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
        var [columns, values, params] = this.parseColumnForCreateUpdate(project);
        const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values);
        return result;
    }
    async update(project, id) {
        if (!this.validate(project, ["name", "id"]))
            throw new httpErrors_1.HTTP400Error("Value provide is not valid");
        await this.findById(id);
        var [columns, values, params] = this.parseColumnForCreateUpdate(project);
        const querySET = params.includes(',') ? `(${columns} = ${params})` : `${columns} = ${params}`;
        const result = await this.pool.query(`UPDATE ${this.table} SET ${querySET} WHERE id = ${id} RETURNING *`, values);
        return result;
    }
}
exports.default = Project;
//# sourceMappingURL=projects.model.js.map