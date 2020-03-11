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
            return this.columns[column].validator(obj[column]);
        });
    }
    parseColumnForCreate(obj) {
        var keyValuePairs = Object.entries(obj);
        if (keyValuePairs.length == 0)
            throw new httpErrors_1.HTTP400Error("Missing value in object creation");
        var [columns, values, params] = keyValuePairs.reduce(([cols, vals, parms], [column, value], i) => {
            return [[...cols, column], [...vals, value], [...parms, `$${i + 1}`]];
        }, [[], [], []]);
        return [columns.join(), values, params.join()];
    }
    async findAll() {
        const result = await database_1.default.query(`SELECT * FROM ${this.table}`);
        return result;
    }
    async findById(id) {
        if (!id)
            throw new httpErrors_1.HTTP400Error("ID is not provided");
        const result = await database_1.default.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
        return result;
    }
}
exports.default = Model;
//# sourceMappingURL=base.js.map