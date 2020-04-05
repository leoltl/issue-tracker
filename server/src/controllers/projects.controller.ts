import ProjectService from "../services/projects.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class ProjectController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await (new ProjectService()).findAll();
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params
      const result = await (new ProjectService()).findById(projectId);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const project = req.body;
    try {
      const result = await (new ProjectService(project)).create(project);
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params
    const project = {name: req.body.name, projectId};
    try {
      const result = await (new ProjectService(project)).update(project, Number(projectId));
      res.send(result)
    } catch (e) {
      next(e)
    }
  }
}

const controller = new ProjectController()
export default controller;