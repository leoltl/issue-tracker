import ProjectService from "../services/projects.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class ProjectController {
  protected projectService;
  constructor() {
    this.projectService = new ProjectService()
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.projectService.find({ user: req.user });
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params
      const result = await this.projectService.findById(projectId);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const project = req.body.data;
    try {
      const [ result ] = await this.projectService.create(project, req.user);
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params
    const project = { name: req.body.data.name, projectId };
    try {
      const [ result ] = await this.projectService.update(project, Number(projectId));
      res.send(result)
    } catch (e) {
      next(e)
    }
  }

  getProjectMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: projectId } = await this.projectService.findIdByUUID(req.params.projectId)
      const result = await this.projectService.findProjectMembership(projectId);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }
}

const controller = new ProjectController()
export default controller;