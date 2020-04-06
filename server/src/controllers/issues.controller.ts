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
      result.assignedTo = await uService.findOne({ id: result.assignedTo });
      result.projectId = await pService.findOne({ id: result.projectId });
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const issue = { ...req.body, projectId: Number(req.params.id) };
    try {
      const result = await (new IssueService()).create(issue);
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id)
    const issue = { ...req.body, id };
    try {
      const result = await (new IssueService()).update(issue, id);
      res.send(result)
    } catch (e) {
      next(e)
    }
  }
}

const controller = new IssueController()
export default controller;