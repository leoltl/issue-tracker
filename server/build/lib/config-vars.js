"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDatabaseParam() {
    if (process.env.DATABASE_URL) {
        const matches = process.env.DATABASE_URL.match(/^\w+:\/\/([^:]+):([^@]+)@([^:]+):([\d]+)\/(.+)$/);
        if (matches && matches.length === 6) {
            return {
                host: matches[3],
                port: parseInt(matches[4], 10),
                database: matches[5],
                user: matches[1],
                password: matches[2],
            };
        }
    }
    return {
        host: process.env.DB_HOST || '',
        port: parseInt(process.env.DB_PORT || '', 10),
        database: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
    };
}
exports.dbParams = getDatabaseParam();
//# sourceMappingURL=config-vars.js.map