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
        isPrimaryKey: true
      }
    }
    super({ table: "projects", columns })
  }

  async create(project: project) {
    if (!this.validate(project, ["name"])) throw new HTTP400Error("Value provide is not valid")
    var [ columns, values, params ] = this.parseColumnForCreate(project);
    const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params})`, values)
    return result
  }

  async update(project: project) {
    if (!this.validate(project, ["name", "id"])) throw new HTTP400Error("Value provide is not valid")
    const result = await this.pool.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [project.name, project.id])
    return result
  }

  async destroy(id: Number){
    
  }

}

export default Project;