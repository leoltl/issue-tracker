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
  usersUuid: String
}

class Project extends ProjectModel {
  constructor(project: project=null) {
    super();
  }

  private isValid(project: project) {
    if (project.name.length >= 100) throw new HTTP400Error("Project name limited to 100 characters");
  }

  public async create(project: project, user:user) {
    this.isValid(project);
    try {
      const [ createdProject ] = await super.create(project);
      if (createdProject) {
        const pmService = new ProjMemberService()
        const uService = new UsersService()
  
        const projectId: Number = createdProject.id
        const { id: userId }: user = await uService.findIdByUUID(user.usersUuid)
        
        await pmService.create({ projectId, userId })

        const admins = await uService.find({ role: 'admin'}, true)
        admins.forEach(async admin => await pmService.create({ projectId, userId: admin.id }))
      }
      return createdProject;
    } catch (e) {
      throw e
    }
   
  }

  public async update(project: project, id: number) {
    this.isValid(project);
    return super.update(project, id);
  }

  public async find(obj, displayProtectedFields: boolean=false) {
    if (obj.user) {
      const { id: userId } = await new UsersService().findIdByUUID(obj.user.usersUuid);
      const projects = await new ProjMemberService().findByUserId(userId);
      if (!projects.length) return []
      const projectIds = projects.map(project => project.projectId);
      return super.find({ id: projectIds });
    } else {
      return super.find(obj, displayProtectedFields);
    }
  }

  public async findOne(obj, displayProtectedFields: boolean=false) {
    return super.findOne(obj, displayProtectedFields);
  }

  public async findAll() {
    return super.findAll();
  }

  public async findById(projectId: number) {
    return super.findById(projectId);
  }

  public async findIdByUUID(uuid) {
    return super.findIdByUUID(uuid);
  }

  public async findProjectMembership(projectId: number) {
    return super.findProjectMembership(projectId);
  }
}

export default Project;