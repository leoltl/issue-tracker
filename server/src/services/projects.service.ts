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
    return super.create(project);
  }
  
  public async update(project: project) {
    this.isValid(project);
    return super.update(project);
  }

  public async findAll() {
    return super.findAll();
  }
}

export default Project;