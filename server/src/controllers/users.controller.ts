import UserService from "../services/Users/users.service";
import { Request, Response, NextFunction, Error } from "express";
import { HTTP400Error, HTTP401Error } from '../lib/httpErrors';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await new UserService().findAll();
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params
      const result = await new UserService().find({ username })
      res.send(result);
    } catch (e) {
      next(e)
    }
  }
1
  async create(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    try {
      const result = await new UserService().create(newUser);
      res.send(result)
    } catch (e) {
      next(e)
    } 
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { username } = req.params;
    const userService = new UserService();
    const [ user ] = await userService.find({ username }, true );
    console.log(user);
    const updateUser = { ...user, ...req.body };
    try {
      const result = await userService.update(updateUser, user.id);
      res.send(result)
    } catch (e) {
      next(e)
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body.data;
    const userService = new UserService();
    try {
      if (!username || !password) throw new HTTP400Error('Missing credentials. Please try again.')
      const authenticatedUser = await userService.signIn(username, password);
      if (!authenticatedUser) throw new HTTP401Error('Authentication failed. Please try again.')
      req.session.user = authenticatedUser
      res.sendStatus(200)
    } catch (e) {
      next(e)
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
      req.session.destroy();
    }
    res.clearCookie('user_sid')
    res.sendStatus(200)
  }
}

const controller = new UserController()
export default controller;