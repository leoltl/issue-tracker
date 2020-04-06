import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors'

interface issue {
  title: String,
  id?: Number,
  description: String,
  authorId: Number,
  projectId: Number,
  createdAt: String,
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
        isPrimaryKey: true,
        protected: true,
      },
      description: {
        colName: "description",
        validator: (val) => val && typeof val == "string" || true,
      },
      authorId: {
        colName: "author_id",
        validator: (val) => val && typeof val == "number",
        protected: true,
      },
      projectId: {
        colName: "project_id",
        validator: (val) => val && typeof val == "number",
        protected: true,
      },
      createdAt: {
        colName: "created_at",
        validator: (val) => true,
      },
      issuesUuid: {
        colName: "issues_uuid",
        validator: () => true
      }
    }
    super({ table: "issues", columns })
  }

  protected async create(issue: issue) {
    try {
      this.validate(issue, ["title", "description", "authorId", "projectId"])
      //TODO: check valid issue author
      var [ columns, values, params ] = this.parseColumnForCreateUpdate(issue);
      const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
      return result
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }

  // protected async find(obj) {
  //   var conditions = Object.entries(obj);
  //   const whereClause = conditions.map(([column, value]) => `${column} = '${value}'`).join(' AND ')
  //   try {
  //     const result = await this.pool.query(`
  //     SELECT * FROM issues
  //     JOIN users AS author_user ON issues.author_id = author_user.id
  //     WHERE ${whereClause}
  //     `)
  //     return this._stripProtectedFields(result, ['password'])
  //   } catch (e) {
  //     throw e
  //   }
  // }

  protected async update(issue: issue, id) {
    try {
      this.validate(issue, ["title", "description", "authorId", "projectId"])
      await this.findById(id)
      const result = await this.pool.query(`UPDATE ${this.table} SET name = $1 WHERE id = $2`, [issue, issue.id])
      return result
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }

  protected async findAllByProjectId(projectId: number) {
    const result = await this.pool.query(`
      SELECT * from ${this.table} 
      JOIN users ON ${this.table}.author_id = users.id 
      WHERE project_id = $1`, [projectId])
    if (!result) throw new HTTP400Error("Record not found")
    return this._stripProtectedFields(result, ['password'])
  }

}

export default Issue;