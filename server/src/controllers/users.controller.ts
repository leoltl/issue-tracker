import UserService from "../services/Users/users.service";
import { Request, Response, NextFunction, Router, Error } from "express";

class UserController {
  // async getAll(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await (new UserService()).findAll();
  //     res.send(result);
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('params:', req.params)
      const { userId } = req.params
      const result = await (new UserService()).findById(userId);
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    try {
      const result = await (new UserService()).create(newUser);
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  // async update(req: Request, res: Response, next: NextFunction) {
  //   const { projectId } = req.params
  //   const project = {name: req.body.name, projectId};
  //   try {
  //     const result = await (new ProjectService(project)).update(project, Number(projectId));
  //     res.send(result)
  //   } catch (e) {
  //     next(e)
  //   }
  // }
}

const controller = new UserController()
export default controller;