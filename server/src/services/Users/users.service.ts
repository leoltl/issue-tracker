import UserModel from "../../models/users.model";
import ADMIN from './superuser.service';
import { HTTP400Error } from '../../lib/httpErrors'


interface user {
  name: string,
  id?: number,
  password: string,
  email: string
}

class UserService extends UserModel {
  protected roleFunctions
  private user
  constructor(user: user=null) {
    super();
    this.user = user;
  }

  private async loadRoleFunctionality() {
    const role = await this._fetchUserType(1)
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
    return true
  }

  public async create(user: user) {
    this.isValid(user);
    return super.create(user);
  }
  
  public async update(user: user, id: number) {
    this.isValid(user);
    return super.update(user, id);
  }

  public async findAll() {
    return super.findAll();
  }

  public async findById(userId: number) {
    console.log(userId);
    return super.findById(userId);
  }

  public async _fetchUserType(userId: number) {
    const { role } = await this.findById(userId);
    return role
  }
}

export default UserService;