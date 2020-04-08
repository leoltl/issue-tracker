import ProjectModel from "../models/projects.model";
import { HTTP400Error } from '../lib/httpErrors'

interface project {
  name: String,
  id?: Number
}

class Project extends ProjectModel {
  constructor(project: project=null) {
    super();
  }

  private isValid(project: project) {
    if (project.name.length >= 100) throw new HTTP400Error("Project name limited to 100 characters");
  }

  public async create(project: project) {
    this.isValid(project);
    const createdProject = await super.create(project);
    if (createdProject) {
      
    }

    return createdProject;
  }
  
  public async update(project: project, id: number) {
    this.isValid(project);
    return super.update(project, id);
  }

  public async find(obj, displayProtectedFields: boolean=false) {
    return super.find(obj, displayProtectedFields);
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