import { HTTP400Error } from '../lib/httpErrors';
import pool from "../lib/database";
import { Pool } from 'pg'

interface Column {
  colName: String;
  validator: Validator;
  required?: boolean;
  isPrimaryKey?: boolean;
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

  protected validate(obj: any, columns: Array<string>): boolean {
    return columns.every(column => {
      console.log(column, this.columns[column])
      return this.columns[column].validator(obj[column])
    })
  }
  
  protected parseColumnForCreateUpdate(obj): [string, any[], string] {
    var keyValuePairs = Object.entries(obj);
    if (keyValuePairs.length == 0) throw new HTTP400Error("Missing value in object creation")
    var [columns, values, params] = keyValuePairs.reduce(
      ([cols, vals, parms]: [Array<string>, Array<string>, Array<string>], [column, value]: [string, string], i: number)  => {
        if (this.columns[column].isPrimaryKey) return [cols, vals, parms]
        return [[...cols, this.columns[column].colName], [...vals, value], [...parms, `$${i+1}`]]
    }, [[], [], []])  
    console.log(columns, values, params)
    return [columns.join(), values, params.join()]
  }

  protected async findAll(): Promise<Array<any> | any> {
    const result = await pool.query(`SELECT * FROM ${this.table}`)
    if (!result) throw new HTTP400Error("Record not found")
    return result
  }

  protected async findById(id: Number): Promise<Array<any> | any> {
    if (!id) throw new HTTP400Error("ID is not provided")
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
    if (!result) throw new HTTP400Error("Record not found")
    return result
  }

  protected async destroy(id: Number): Promise<Array<any> | any> {
    if (!id) throw new HTTP400Error("ID is not provided")
    await this.findById(id)
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
    return result
  }

  protected abstract create(obj: any): Promise<Array<any> | any>

  protected abstract update(obj: any, id: Number): Promise<Array<any> | any>

}

export default Model