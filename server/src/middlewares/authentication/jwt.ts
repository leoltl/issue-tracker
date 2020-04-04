import { Request, Response, NextFunction, Router, Error } from "express";
import { HTTP400Error } from '../../lib/httpErrors';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

function authenticate(req: Request, res: Response, next: NextFunction) {
  // console.log('req', req)
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const valid = jwt.verify(token, SECRET);
    const { username, name, email, role } = valid;
    req.user = { username, name, email, role };
    next()
  } catch (e) {
    req.user = null;
    next()
  }
}

export function generateJWToken (user) {
  const SIGN_OPTIONS = { 
    expiresIn: '24h',
    issuer: 'issue-tracker'
  }
  const token = jwt.sign(user, SECRET, SIGN_OPTIONS)
  return token
}

export default authenticate;
