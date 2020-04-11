import IssueService from "../services/issues.service";
import ProjectService from "../services/projects.service";
import UserService from "../services/Users/users.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class IssueController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params
      const { id: dbID } = await (new ProjectService()).findIdByUUID(projectId);
      const result = await (new IssueService()).findAllByProjectId(dbID);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const iService = new IssueService()
    const uService = new UserService()
    const pService = new ProjectService()
    try {
      const result = await iService.findOne({ 'issues_uuid': req.params.issueId }, true);
      result.authorId = await uService.findOne({ id: result.authorId });
      result.assignedId = result.assignedId && await uService.findOne({ id: result.assignedId }) || "";
      result.projectId = await pService.findOne({ id: result.projectId });
    
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const uService = new UserService()
    const pService = new ProjectService()
    const iService = new IssueService()
    const issue = req.body.data;
    const projects_uuid = req.params.projectId;
    try {
      const { id: projectId } = await pService.findIdByUUID(projects_uuid);
      const { id: authorId } = await uService.findIdByUUID(issue.authorId );
      const result = await iService.create({ ...issue, projectId, authorId });
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const issuesUuid = req.params.issueId
    const iService = new IssueService()
    const pService = new ProjectService()
    const uService = new UserService()
    const { projectId: projects_uuid, 
            assignedId: assigned_uuid, 
            authorId: author_uuid, 
            ...rest } = req.body.data;

    try {
      const { id: projectId } = await pService.findIdByUUID(projects_uuid);
      const { id: authorId } = await uService.findIdByUUID(author_uuid);
      const { id: assignedId } = await uService.findIdByUUID(assigned_uuid);
      const [ issue ] = await iService.find({ 'issues_uuid': issuesUuid }, true );
      const updatedIssue = {...issue, ...rest, projectId, authorId, assignedId}
      console.log(updatedIssue);
      const result = await iService.update(updatedIssue, issue.id);
      res.send(result)
    } catch (e) {
      next(e)
    }
  }
}

const controller = new IssueController()
export default controller;