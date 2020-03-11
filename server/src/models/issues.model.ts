import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors'

interface issue {
  title: String,
  id?: Number,
  description: String,
  authorId: Number,
  projectId: Number,
}

class Issue extends Model {
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
        validator: (val) => val && typeof val == "string" || true,
      },
      authorId: {
        colName: "author_id",
        validator: (val) => val && typeof val == "number",
      },
      projectId: {
        colName: "project_id",
        validator: (val) => val && typeof val == "number",
      }
    }
    super({ table: "issues", columns })
  }

  protected async create(issue: issue) {
    if (!this.validate(issue, ["title", "description", "authorId", "projectId"])) throw new HTTP400Error("Value provide is not valid")
    //TODO: check valid issue author
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(issue);
    const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
    return result
  }

  protected async update(issue: issue, id) {
    if (!this.validate(issue, ["title", "description", "authorId", "projectId"])) throw new HTTP400Error("Value provide is not valid")
    await this.findById(id)
    const result = await this.pool.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [issue, issue.id])
    return result
  }

  protected async findAllByProjectId(projectId: number) {
    const result = await this.pool.query(`SELECT * from ${this.table} WHERE project_id = $1`, [projectId])
    if (!result) throw new HTTP400Error("Record not found")
    return result
  }

}

export default Issue;