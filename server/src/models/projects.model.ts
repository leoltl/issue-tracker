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
      },
      projectsUuid: {
        colName: "projects_uuid",
        validator: () => true
      }
    }
    super({ table: "projects", columns })
  }

  async create(project: project, options?: any) {
    try {
      this.validate(project, ["name"])
      var [ columns, values, params ] = this.parseColumnForCreateUpdate(project);
      const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
      return this._stripProtectedFields(result)
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }

  async update(project: project, id) {
    try {
      this.validate(project, ["name", "id"])
      var [ columns, values, params ] = this.parseColumnForCreateUpdate(project);
      const querySET = params.includes(',') ? `(${columns}) = (${params})` : `${columns} = ${params}`
      const result = await this.pool.query(`UPDATE ${this.table} SET ${querySET} WHERE id = ${id} RETURNING *`, values)
      return result
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }
}

export default Project;