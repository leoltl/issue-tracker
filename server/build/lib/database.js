"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_vars_1 = require("./config-vars");
class DB {
    constructor() {
        this.pool = null;
    }
    async query(query, params) {
        const res = await this.pool.query(query, params);
        return res.rows.length > 1 ? res.rows : res.rows[0];
    }
    getInstance() {
        if (!this.pool) {
            this.pool = new pg_1.Pool(config_vars_1.dbParams);
        }
        return this;
    }
}
exports.default = new DB().getInstance();
//# sourceMappingURL=database.js.map