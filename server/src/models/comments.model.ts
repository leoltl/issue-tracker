import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors'

interface comment {
  id?: Number,
  body: String,
  authorId: Number,
  issueId: Number,
  commentsUuid: String,
  createdAt: String,
}

class Comment extends Model {
  constructor() {
    const columns = {
      id: {
        colName: "id",
        validator: (val) => val && typeof val == "number",
        isPrimaryKey: true,
        protected: true,
      },
      body: {
        colName: "body",
        validator: (val) => val && typeof val == "string",
      },
      commentsUuid: {
        colName: "comments_uuid",
        validator: () => true
      },
      issueId: {
        colName: "issue_id",
        validator: (val) => val && typeof val == "number",
        protected: true,
      },
      authorId: {
        colName: "author_id",
        validator: (val) => val && typeof val == "number",
      },
      createdAt: {
        colName: "created_at",
        validator: (val) => true,
      },
    }
    super({ table: "comments", columns })
  }

  async create(comment: comment) {
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(comment);
    const res = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
    return res
  }
  
  async update(obj:any) {
    void(0)
  }

}

export default Comment;