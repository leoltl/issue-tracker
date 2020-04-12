import IssueService from "../services/issues.service";
import ProjectService from "../services/projects.service";
import UserService from "../services/Users/users.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class IssueController {
  protected issueService;
  protected projectService;
  protected userService;

  constructor() {
    this.issueService = new IssueService()
    this.projectService = new ProjectService()
    this.userService = new UserService()
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params
      const { id: dbID } = await this.projectService.findIdByUUID(projectId);
      const result = await this.issueService.findAllByProjectId(dbID);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await this.issueService.findOne({ 'issues_uuid': req.params.issueId }, true);
      result = await this.populateIssueDetails(result)
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const issue = req.body.data;
    const projects_uuid = req.params.projectId;
    try {
      const [ 
        { id: projectId },
        { id: authorId  },
        { id: updatedBy } ] = await Promise.all([
          this.projectService.findIdByUUID(projects_uuid),
          this.userService.findIdByUUID(issue.authorId),
          this.userService.findIdByUUID(user.usersUuid)
        ])
      let [ result ] = await this.issueService.create({ ...issue, projectId, authorId, updatedBy });
      result = await this.populateIssueDetails(result)
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const issuesUuid = req.params.issueId
    const { projectId:  projects_uuid, 
            assignedId: assigned_uuid, 
            authorId:   author_uuid, 
            ...rest } = req.body.data;
    try {
      const [ 
        { id: projectId  },
        { id: authorId   },
        { id: assignedId }, 
        { id: updatedBy  }, 
        [ issue ] ] = await Promise.all([
          this.projectService.findIdByUUID(projects_uuid),
          this.userService.findIdByUUID(author_uuid),
          assigned_uuid ? this.userService.findIdByUUID(assigned_uuid) : {id: null},
          this.userService.findIdByUUID(user.usersUuid),
          this.issueService.find({'issues_uuid': issuesUuid}, true )
        ]);
      const updatedIssue = {...issue, ...rest, projectId, authorId, assignedId, updatedBy}
      let [ result ] = await this.issueService.update(updatedIssue, issue.id);
      result = await this.populateIssueDetails(result)
      res.send(result)
    } catch (e) {
      next(e)
    }
  }
  

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issueUuid = req.params.issueId
      let results = await this.issueService.findHistory({ 'record_uuid': issueUuid });
      results = await Promise.all(results.map(({ newVal }) => this.populateIssueDetails(newVal)));
      res.send(results);
    } catch (e) {
      next(e)
    }    
  }

  populateIssueDetails = async (issue) => {
    const _issue = {...issue}
    _issue.projectId = await this.projectService.findOne({ id: issue.project_id || issue.projectId });
    _issue.authorId = await this.userService.findOne({ id: issue.author_id || issue.authorId });
    _issue.assignedId = _issue.assigned_id || issue.assignedId ? await this.userService.findOne({ id: issue.assigned_id || issue.assignedId }) : null
    _issue.updatedBy = _issue.updated_by || issue.updatedBy ? await this.userService.findOne({ id: issue.updated_by || issue.updatedBy }) : null
    delete _issue.id
    delete _issue.project_id
    delete _issue.author_id
    delete _issue.assigned_id
    delete _issue.updated_by
    return _issue
  }
}

const controller = new IssueController()
export default controller;