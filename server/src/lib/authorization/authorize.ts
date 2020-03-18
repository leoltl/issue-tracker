import { Request, Response, NextFunction, Router, Error } from "express";
import UserService from '../../services/Users/users.service';
import { HTTP400Error } from '../httpErrors';


function authorize(roles: string | Array<string> = []) {
  if (typeof roles == 'string') {
    roles = [roles]
  }

  return [
    async function TONAME(req: Request, res: Response, next: NextFunction) {
      req.user = await new UserService().findById(req.body.userId || req.params.userId)
      //TODO: authentication


      next();
    },

    function roleAuthorization(req: Request, res: Response, next: NextFunction) {
      if (roles.length && roles.includes(req.user.role)) {
        next();
        return
      }
      throw new HTTP400Error('Unauthorized Access.')
    }
  ]
}

export default authorize;