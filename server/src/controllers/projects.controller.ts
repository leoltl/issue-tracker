import ProjectService from "../services/projects.service";
import ProjMemberService from "../services/projMember.service";
import UsersService from "../services/Users/users.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class ProjectController {
  protected projectMemberService;
  protected projectService;
  protected usersService;
  constructor() {
    this.projectMemberService = new ProjMemberService()
    this.projectService = new ProjectService()
    this.usersService = new UsersService()
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
      const result = await this.projectMemberService.findProjectMembership(projectId);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  createProjectMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: projectId } = await this.projectService.findIdByUUID(req.params.projectId);
      const members = req.body.data.members;
      const memberIds: Array<{id: Number}> = await Promise.all(
        members.map(member => this.usersService.findIdByUUID(member))
      );
      await Promise.all(
        memberIds
          .map(userId => ({ projectId, userId: userId.id }))
          .map(projMemberObj => this.projectMemberService.create(projMemberObj))
      )
      res.sendStatus(200);
    } catch (e) {
      next(e)
    }
  }

  destroyProjectMembers = async (req: Request, res: Response, next: NextFunction) => {
    try { 
      const { id: projectId } = await this.projectService.findIdByUUID(req.params.projectId);
      const { id: userId } = await this.usersService.findIdByUUID(req.body.data.userId);
      const result = await this.projectMemberService.destroy({ userId: userId, projectId });
      res.sendStatus(200);
    } catch (e) {
      next(e)
    }
   
  }
}

const controller = new ProjectController()
export default controller;