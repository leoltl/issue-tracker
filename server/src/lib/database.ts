import { Pool } from "pg";
import { dbParams } from './config-vars';

interface iDB {
  getInstance(): void;
}

class DB implements iDB{
  pool: any;
  constructor() {
    this.pool = null
  }

  async query(query: String, params?: Array<any>): Promise<Array<any> | any> {
    const res = await this.pool.query(query, params)
    return res.rows.length > 1 ? res.rows : res.rows[0]
  } 

  getInstance() {
    if (!this.pool) { this.pool = new Pool(dbParams); }
    return this
  }
}
export default new DB().getInstance();