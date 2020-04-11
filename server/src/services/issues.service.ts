import IssueModel from "../models/issues.model";
import { HTTP400Error } from '../lib/httpErrors'

interface issue {
  title: String,
  id?: Number,
  description: String,
  authorId: Number,
  projectId: Number,
  createdAt: String,
  assignedId: Number,
  priority: String,
}
class Issue extends IssueModel {
  constructor(project: issue=null) {
    super();
  }

  private isValid(issue: issue) {
    if (issue.title.length >= 100) throw new HTTP400Error("Issue title limited to 100 characters");
  }

  public async create(issue: issue) {
    this.isValid(issue);
    if (issue.priority == "") {
      delete issue.priority
    }
    return super.create(issue);
  }
  
  public async update(issue: issue, id: number) {
    this.isValid(issue);
    return super.update(issue, id);
  }

  public async find(obj, displayProtectedFields?) {
    return super.find(obj, displayProtectedFields)
  }

  public async findOne(obj, displayProtectedFields?) {
    return super.findOne(obj, displayProtectedFields)
  }

  public async findAll() {
    return super.findAll();
  }

  public async findById(issueId: number) {
    return super.findById(issueId);
  }

  public async findHistory(obj) {
    return super.findHistory(obj)
  }

  public async findAllByProjectId(projectId: number) {
    return super.findAllByProjectId(projectId);
  }

  public async findIdByUUID(uuid) {
    return super.findIdByUUID(uuid);
  }
}

export default Issue;