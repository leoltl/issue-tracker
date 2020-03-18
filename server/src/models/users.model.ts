import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors'

interface user {
  name: string,
  id?: number,
  password: string,
  email: string
}

class UserModel extends Model {
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
      },
      password: {
        colName: "password",
        validator: (val) => val && typeof val == "number",
        protected: true,
      },
      email: {
        colName: "email",
        validator: (val) => val && typeof val == "number",
      },
      role: {
        colName: 'role',
        validator: (val) => val
      }
    }
    super({ table: "users", columns })
  }

  async create(user: user) {
    if (!this.validate(user, ["name"])) throw new HTTP400Error("Value provide is not valid")
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(user);
    const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
    return result
  }

  async update(user: user, id) {
    if (!this.validate(user, ["name", "id"])) throw new HTTP400Error("Value provide is not valid")
    await this.findById(id)
    var [ columns, values, params ] = this.parseColumnForCreateUpdate(user);
    const querySET = params.includes(',') ? `(${columns} = ${params})` : `${columns} = ${params}`
    const result = await this.pool.query(`UPDATE ${this.table} SET ${querySET} WHERE id = ${id} RETURNING *`, values)
    return result
  }

}

export default UserModel;