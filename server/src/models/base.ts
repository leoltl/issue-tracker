import { HTTP400Error } from '../lib/httpErrors';
import pool from "../lib/database";
import { Pool } from 'pg'

interface Column {
  colName: String;
  validator: Validator;
  required?: boolean;
  isPrimaryKey?: boolean;
  protected?: boolean;
}

interface modelProperty {
  table: String,
  columns: { [name: string]: Column }
}

interface Validator {
  (val: any) : boolean;
}

interface parsedColumnResult {
  columns: Array<String>,
  values: Array<String | Number>,
  params: Array<String>
}

abstract class Model {
  public table: String;
  public columns: { [name: string]: Column }
  protected pool: Pool
  
  constructor(prop: modelProperty) {
    this.table = prop.table;
    this.columns = prop.columns
    this.pool = pool
  }

  protected validate(obj: any, fields: Array<string>): boolean {
    fields.forEach(field => {
      // console.log(column, this.columns[column])
      var isValid = this.columns[field].validator(obj[field])
      if (!isValid) {
        const e = new Error(`Validation failed at field: ${field} with value: ${obj[field]}`);
        e.name = 'Validator Rejected'
        throw e;
      }
    })
    return true;
  }

  protected async find(obj: any, displayProtectedFields: boolean=false) {
    var conditions = Object.entries(obj);
    // TODO: add more flexiblity
    const whereClause = conditions.map((condition) => `${condition[0]} = '${condition[1]}'`).join(' AND ')
    
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE ${whereClause}`)
    if (result.length == 0) throw new HTTP400Error("Record not found")
    if (displayProtectedFields) return result;
    return this._stripProtectedFields(result)
  }

  protected parseColumnForCreateUpdate(obj): [string, any[], string] {
    var keyValuePairs = Object.entries(obj);
    if (keyValuePairs.length == 0) throw new HTTP400Error("Missing value in object creation")
    var [columns, values, params] = keyValuePairs.reduce(
      ([cols, vals, parms]: [Array<string>, Array<string>, Array<string>], [column, value]: [string, string], i: number)  => {
        if (this.columns[column].isPrimaryKey) return [cols, vals, parms] // skip prop if primary key
        return [[...cols, this.columns[column].colName], [...vals, value], [...parms, `$${i+1}`]]
    }, [[], [], []])  
    return [columns.join(), values, params.join()]
  }

  protected async findAll(displayProtectedFields: boolean=false): Promise<Array<any> | any> {
    const result = await pool.query(`SELECT * FROM ${this.table}`)
    if (!result.length) throw new HTTP400Error("Record not found")
    if (displayProtectedFields) return result;
    return this._stripProtectedFields(result)
  }

  protected async findById(id: Number, displayProtectedFields: boolean=false): Promise<Array<any> | any> {
    if (!id) throw new HTTP400Error("ID is not provided")
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
    if (!result.length) throw new HTTP400Error("Record not found")

    if (displayProtectedFields) return result;
    return this._stripProtectedFields(result)
  }

  protected async destroy(id: Number, displayProtectedFields: boolean=false): Promise<Array<any> | any> {
    if (!id) throw new HTTP400Error("ID is not provided")
    await this.findById(id)
    // Destory Query TODO:
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])

    if (displayProtectedFields) return result;
    return this._stripProtectedFields(result);
  }

  protected abstract create(obj: any): Promise<Array<any> | any>

  protected abstract update(obj: any, id: Number): Promise<Array<any> | any>


  protected _stripProtectedFields(records: Array<any> | any) {
    if (!Array.isArray(records)) { records = [records] }
    const safeRecords = records.map(record => {
      const safeRecord = {}
      Object.keys(record).forEach(key => {
        if (this.columns[key].protected == true) return
        safeRecord[key] = record[key]
      })
      return safeRecord;
    })
    return safeRecords.length > 1 ? safeRecords : safeRecords[0]
  }

}

export default Model