import ProjectModel from "../models/projects.model";
import ProjMemberService from './projMember.service';
import UsersService from './Users/users.service';
import { HTTP400Error } from '../lib/httpErrors'

interface project {
  name: String,
  id?: Number
}

interface user {
  name: string,
  username: string,
  id?: number,
  password: string,
  email: string,
  role: String,
  usersUuid: String
}

class Project extends ProjectModel {
  protected projectMemberService
  protected userService

  constructor() {
    super();
    this.projectMemberService = new ProjMemberService();
    this.userService = new UsersService();
  }

  private isValid(project: project) {
    if (project.name.length >= 100) throw new HTTP400Error("Project name limited to 100 characters");
  }

  public create = async (project: project, user:user) => {
    this.isValid(project);
    try {
      // add project membership upon new project creation
      const [ createdProject ] = await super.create(project);
      if (createdProject) {
  
        const projectId: Number = createdProject.id
        const { id: userId }: user = await this.userService.findIdByUUID(user.usersUuid)
        
        if (user.role != 'admin') {
          await this.projectMemberService.create({ projectId, userId })
        }

        const admins = await this.userService.find({ role: 'admin'}, true)
        admins.forEach(async admin => await this.projectMemberService.create({ projectId, userId: admin.id }))
      }
      return [createdProject];
    } catch (e) {
      throw e
    }
  }

  public update = async (project: project, id: number) => {
    this.isValid(project);
    return super.update(project, id);
  }

  public find = async (obj, displayProtectedFields: boolean=false) => {
    if (obj.user) {
      const { id: userId } = await this.userService.findIdByUUID(obj.user.usersUuid);
      const projects = await this.projectMemberService.findByUserId(userId);
      if (!projects.length) return []
      const projectIds = projects.map(project => project.projectId);
      return super.find({ id: projectIds });
    } else {
      return super.find(obj, displayProtectedFields);
    }
  }

  public findOne = async (obj, displayProtectedFields: boolean=false) => {
    return super.findOne(obj, displayProtectedFields);
  }

  public findAll = async () => {
    return super.findAll();
  }

  public findById = async (projectId: number) => {
    return super.findById(projectId);
  }

  public findIdByUUID = async (uuid) => {
    return super.findIdByUUID(uuid);
  }
  
}

export default Project;