import IssueService from "../services/issues.service";
import ProjectService from "../services/projects.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class IssueController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params
      const { id: dbID } = await (new ProjectService()).findIdByUUID(projectId);
      console.log(dbID);
      const result = await (new IssueService()).findAllByProjectId(dbID);
      console.log(result);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { issueId } = req.params
      const result = await (new IssueService()).findById(issueId);
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