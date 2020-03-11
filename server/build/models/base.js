"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const httpErrors_1 = require("../lib/httpErrors");
const database_1 = tslib_1.__importDefault(require("../lib/database"));
class Model {
    constructor(prop) {
        this.table = prop.table;
        this.columns = prop.columns;
        this.pool = database_1.default;
    }
    validate(obj, columns) {
        return columns.every(column => {
            console.log(column, this.columns[column]);
            return this.columns[column].validator(obj[column]);
        });
    }
    parseColumnForCreateUpdate(obj) {
        var keyValuePairs = Object.entries(obj);
        if (keyValuePairs.length == 0)
            throw new httpErrors_1.HTTP400Error("Missing value in object creation");
        var [columns, values, params] = keyValuePairs.reduce(([cols, vals, parms], [column, value], i) => {
            if (this.columns[column].isPrimaryKey)
                return [cols, vals, parms];
            return [[...cols, this.columns[column].colName], [...vals, value], [...parms, `$${i + 1}`]];
        }, [[], [], []]);
        console.log(columns, values, params);
        return [columns.join(), values, params.join()];
    }
    async findAll() {
        const result = await database_1.default.query(`SELECT * FROM ${this.table}`);
        if (!result)
            throw new httpErrors_1.HTTP400Error("Record not found");
        return result;
    }
    async findById(id) {
        if (!id)
            throw new httpErrors_1.HTTP400Error("ID is not provided");
        const result = await database_1.default.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
        if (!result)
            throw new httpErrors_1.HTTP400Error("Record not found");
        return result;
    }
    async destroy(id) {
        if (!id)
            throw new httpErrors_1.HTTP400Error("ID is not provided");
        await this.findById(id);
        const result = await database_1.default.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
        return result;
    }
}
exports.default = Model;
//# sourceMappingURL=base.js.map