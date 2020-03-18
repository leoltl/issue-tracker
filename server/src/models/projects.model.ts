import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors'

interface project {
  name: String,
  id?: Number
}

class Project extends Model {
  constructor() {
    const columns = {
      name: {
        colName: "name",
        validator: (val) => val && typeof val == "string"
      },
      id: {
        colName: "id",
        validator: (val) => val && typeof val == "number",
        isPrimaryKey: true,
        protected: true,
      }
    }
    super({ table: "projects", columns })
  }

  async create(project: project) {
    if (!this.validate(project, ["name"])) throw new HTTP400Error("Value provide is not valid")
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(project);
    const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
    return result
  }

  async update(project: project, id) {
    if (!this.validate(project, ["name", "id"])) throw new HTTP400Error("Value provide is not valid")
    await this.findById(id)
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(project);
    const querySET = params.includes(',') ? `(${columns} = ${params})` : `${columns} = ${params}`
    const result = await this.pool.query(`UPDATE ${this.table} SET ${querySET} WHERE id = ${id} RETURNING *`, values)
    return result
  }

}

export default Project;