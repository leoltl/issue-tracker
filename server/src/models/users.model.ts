import Model from "./base";
import { HTTP400Error } from '../lib/httpErrors';
import Roles from '../middlewares/authorization/roles';

import bcrypt from 'bcrypt';
const saltRounds = 10;

interface user {
  name: string,
  username: string,
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
      username: {
        colName: "username",
        validator: (val) => val && typeof val == "string"
      },
      id: {
        colName: "id",
        validator: (val) => val && typeof val == "number",
        isPrimaryKey: true,
        protected: true,
      },
      password: {
        colName: "password",
        validator: (val) => val,
        protected: true,
      },
      email: {
        colName: "email",
        validator: (val) => val,
      },
      role: {
        colName: 'role',
        validator: (val) => {
          return val && [Roles.developer, Roles.productManager, Roles.tester].includes(val)
        }
      }
    }
    super({ table: "users", columns })
  }

  protected async create(user: user) {
    try {
      this.validate(user, ["name", "password", "email", "role"])
      var hashedPassword = await bcrypt.hash(user.password, saltRounds)
      user.password = hashedPassword;
      var [ columns, values, params ] = this.parseColumnForCreateUpdate(user);
      const result = await this.pool.query(`INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`, values)
      return this._stripProtectedFields(result)
    } catch (e) {
      if (e.message == 'duplicate key value violates unique constraint "users_email_key"') {
        throw new HTTP400Error('Duplicated email address provided, email must be unique')
      } else if (e.message == 'duplicate key value violates unique constraint "users_username_key"') {
        throw new HTTP400Error('Duplicated username provided, username must be unique')
      } else if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }

  protected async update(user: user, id) {
    try {
      this.validate(user, Object.keys(user))
      await this.findById(id);
      if (user.password) {
        var hashedPassword = await bcrypt.hash(user.password, saltRounds)
        user.password = hashedPassword;
      }
      delete user.id
      var [ columns, values, params ] = this.parseColumnForCreateUpdate(user);
      const querySET = params.includes(',') ? `(${columns} = ${params})` : `${columns} = ${params}`;
      // console.log(`UPDATE ${this.table} SET ${querySET} WHERE id = ${id} RETURNING *`, values)
      const result = await this.pool.query(`UPDATE ${this.table} SET ${querySET} WHERE id = ${id} RETURNING *`, values);
      return this._stripProtectedFields(result);
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }

  protected async findByUsername(username: string) {
    try {
      const result = await this.pool.query(`SELECT * FROM ${this.table} WHERE username = $1`, [username]);
      return this._stripProtectedFields(result);
    } catch (e) {
      if (e.name == 'Validator Rejected') {
        throw new HTTP400Error(e.message)
      } else {
        throw e
      }
    }
  }
}

export default UserModel;