import { Request, Response, NextFunction, Router, Error } from "express";
import { HTTP403Error } from '../../lib/httpErrors';


function authorize(roles: string | Array<string> = []) {
  if (typeof roles == 'string') {
    roles = [roles]
  }

  return [
    function roleAuthorization(req: Request, res: Response, next: NextFunction) {
      if (roles.length && roles.includes(req.user?.role)) {
        next();
        return
      }
      throw new HTTP403Error('Unauthorized Access.')
    }
  ]
}

export default authorize;