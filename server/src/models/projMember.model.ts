import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors'

interface membership {
  projectId: Number,
  userId: Number
}

class ProjMember extends Model {
  constructor() {
    const columns = {
      projectId: {
        colName: "project_id",
        validator: (val) => val && typeof val == "number"
      },
      userId: {
        colName: "user_id",
        validator: (val) => val && typeof val == "number",
      },
    }
    super({ table: "project_members", columns })
  }

  async find(projMember: membership) {
    const { projectId, userId } = projMember;
    const res = await this.pool.query(`SELECT * FROM ${this.table} WHERE project_id = $1 AND user_id = $2`, [projectId, userId])
    return res;
  }

  async findByProjectId(projectId: number) {
    const res = await this.pool.query(`SELECT * FROM ${this.table} WHERE project_id = $1`, [projectId])
    return res;
  }

  async findByUserId(userId: number) {
    const res = await this.pool.query(`SELECT * FROM ${this.table} WHERE user_id = $1`, [userId])
    return res;
  }

  async create(projMember: membership) {
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(projMember);
    const prevRecord = await this.find(projMember)
    if (prevRecord.length) throw Error ('Membership of project has already been created.')
    const res = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
    return res
  }
  
  async update(obj:any) {
    void(0)
  }

  async findProjectMembership(projectId: number) {
    try {
      const result = await this.pool.query(`
        SELECT * 
        FROM project_members 
        JOIN users ON project_members.user_id = users.id 
        WHERE project_members.project_id = $1
        `, [projectId])
        return this._stripProtectedFields(result, ["password", "userId", "projectId"])
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }

}

export default ProjMember;