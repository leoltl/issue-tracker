import { Pool } from "pg";
import { dbParams } from './config-vars';
import { HTTP400Error } from './httpErrors';

interface iDB {
  getInstance(): void;
}

class DB implements iDB{
  pool: any;
  constructor() {
    this.pool = null
  }

  async query(query: string, params?: Array<any>): Promise<Array<any> | any> {
    const res = await this.pool.query(query, params)
    return this.parseResultColumns(res.rows);
  } 

  private parseResultColumns (record) {
    return record.map(record => {
      const result = {}
      Object.keys(record).forEach(key => {
        result[parseSnakeToCamelCase(key)] = record[key];
      })
      return result;
    })
    
    function parseSnakeToCamelCase (val) {
      return val.split('_').map((part, i) => {
        if (i == 0) return part
        return part.substring(0, 1).toUpperCase().concat('', part.substring(1));
      }).join('')
    } 
  }

  getInstance() {
    if (!this.pool) { this.pool = new Pool(dbParams); }
    return this
  }
}
export default new DB().getInstance();