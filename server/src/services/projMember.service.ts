import ProjMemberModel from "../models/projMember.model";
import { HTTP400Error } from '../lib/httpErrors'

interface projMember {
  projectId: Number,
  userId: Number
}

class ProjMember extends ProjMemberModel {
  constructor(projMember: projMember=null) {
    super();
  }

  private isValid(projMember: projMember) {
    return true
  }

  async findByProjectId(projectId: number) {
    return super.findByProjectId(projectId)
  }

  async findByUserId(userId: number) {
    return super.findByUserId(userId)
  }

  public async create(projMember: projMember) {
    // this.isValid(projMember);
    return super.create(projMember);
  }
  
  public async update(projMember: projMember) {
    // this.isValid(projMember);
    throw Error ('Method does not exist')
  }

  public async destroy(projMember: projMember) {
    return super.destroy(projMember);
  }

  public async find(projMember: projMember) {
    return super.find(projMember);
  }

  public async findOne(projMember: projMember, displayProtectedFields?) {
    return super.find(projMember);
  }

  public async findAll() {
    throw Error('Method does not exist on this model.')
  }
}

export default ProjMember;