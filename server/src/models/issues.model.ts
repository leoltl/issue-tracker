import Model from "./base";
import pool from "../lib/database";
import { HTTP400Error } from '../lib/httpErrors'

interface issue {
  title: String,
  id?: Number,
  description: String,
  authorId: Number,
}

class Project extends Model {
  constructor() {
    const columns = {
      title: {
        colName: "title",
        validator: (val) => val && typeof val == "string"
      },
      id: {
        colName: "id",
        validator: (val) => val && typeof val == "number",
        isPrimaryKey: true
      },
      description: {
        colName: "description",
        validator: (val) => typeof val == "string",
      },
      authorId: {
        colName: "author_id",
        validator: (val) => val && typeof val == "number",
      },
    }
    super({ table: "projects", columns })
  }

  async create(issue: issue) {
    if (!this.validate(issue, ["title", "description", "authorId"])) throw new HTTP400Error("Value provide is not valid")
    var [ columns, values, params ] = this.parseColumnForCreate(issue);
    const result = await pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params})`, values)
    return result
  }

  async update(project: issue) {
    if (!this.validate(project, ["name", "id"])) throw new HTTP400Error("Value provide is not valid")
    const result = await pool.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [project, project.id])
    return result
  }

  async destroy(id: Number){
    
  }

}

export default Project;