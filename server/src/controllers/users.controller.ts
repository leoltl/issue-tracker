import UserService from "../services/Users/users.service";
import { Request, Response, NextFunction, Error } from "express";
import { HTTP400Error, HTTP401Error } from '../lib/httpErrors';
import { generateJWToken } from '../middlewares/authentication/jwt';

class UserController {
  protected userService;
  constructor() {
    this.userService = new UserService()
  }
  
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.findAll();
      res.send(result);
    } catch (e) {
      next(e)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params
      const result = await this.userService.find({ username })
      res.send(result);
    } catch (e) {
      next(e)
    }
  }
1
  create = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body.data
    try {
      const [ user ] = await this.userService.create(newUser);
      const token = await generateJWToken(user)
      res.status(200).send(token)
    } catch (e) {
      next(e)
    } 
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { usersUuid } = req.params;
    try {
      const [ user ] = await this.userService.find({ 'users_uuid': usersUuid }, true );
      const updateUser = { ...user, ...req.body.data };
      const result = await this.userService.update(updateUser, user.id);
      res.send(result)
    } catch (e) {
      next(e)
    }
  }

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body.data;
    try {
      if (!username || !password) throw new HTTP400Error('Missing credentials. Please try again.')
      const authenticatedUser = await this.userService.signIn(username, password);
      if (!authenticatedUser) throw new HTTP401Error('Authentication failed. Please try again.')
      const token = await generateJWToken(authenticatedUser)
      res.status(200).send(token)
    } catch (e) {
      next(e)
    }
  }

  signOut = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
      req.session.destroy();
    }
    res.clearCookie('user_sid')
    res.sendStatus(200)
  }

  getMe = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
  }

  refreshToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const token = generateJWToken(req.user)
      res.status(200).send(token)
    } else {
      res.status(401).send('Invalid token provided. Please reauthenticate.')
    }
  }
}

const controller = new UserController()
export default controller;