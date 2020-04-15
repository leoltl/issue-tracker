import UserModel from "../../models/users.model";
import ADMIN from './superuser.service';
import { HTTP400Error } from '../../lib/httpErrors'


import bcrypt from 'bcrypt';


interface user {
  name: string,
  username: string,
  id?: number,
  password: string,
  password2: string,
  email: string,
  role: string,
}

class UserService extends UserModel {
  protected roleFunctions
  private user
  constructor(user: user=null) {
    super();
    this.user = user;
  }

  private async loadRoleFunctionality() {
    const role = await this._fetchUserType('1')
    switch (role) {
      case 'admin':
        // this.roleFunctions = new ADMIN(this.userInfo)
        break;
      // case 'pm':
      //   this.roleFunctions = new PM(this.userInfo)
      //   break;
      // case 'dev':
      //   this.roleFunctions = new DEV(this.userInfo)
      //   break;
      // case 'tester':
      //   this.roleFunctions = new TESTER(this.userInfo)
      //   break;
      default:
        throw new HTTP400Error('Invalid user type')
    }
  }

  private isValid(user: user) {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!emailRegExp.test(user.email)) { throw new HTTP400Error('Invalid email address')}
    if (user.password.length < 8) { throw new HTTP400Error('Password should be at least 8 character long')}
    if (user.password2 && user.password != user.password2) { throw new HTTP400Error('Password don\'t match') }
  }

  public async create(user: user) {
    this.isValid(user);
    const { password2, ..._user } = user
    return super.create(_user);
  }
  
  public async update(user: user, id: number) {
    this.isValid(user);
    return super.update(user, id);
  }

  public async findAll() {
    return super.findAll();
  }

  public async findIdByUUID(uuid) {
    return super.findIdByUUID(uuid);
  }

  public async find(obj, displayProtectedFields: boolean=false) {
    return super.find(obj, displayProtectedFields);
  }

  public async findOne(obj, displayProtectedFields: boolean=false) {
    return super.findOne(obj, displayProtectedFields);
  }

  public async signIn(username: string, password:string): Promise<user|boolean>{
    const user = await this.findOne({ username }, true)
    const match = await bcrypt.compare(password, user.password)
    return match ? this._stripProtectedFields(user) : false
  }

  public async _fetchUserType(username: string): Promise<string> {
    const [{ role }] = await this.find({ username });
    return role
  }
}

export default UserService;