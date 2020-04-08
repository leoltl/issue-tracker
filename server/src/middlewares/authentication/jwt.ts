import { Request, Response, NextFunction, Router, Error } from "express";
import { HTTP400Error, HTTP401Error } from '../../lib/httpErrors';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

export function extractUserFromHeader(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const validUser = jwt.verify(token, SECRET);
    const { username, name, email, role, usersUuid } = validUser;
    req.user = { username, name, email, role, usersUuid };
    next()
  } catch (e) {
    req.user = null;
    next()
  }
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  if (req.user != null) {
    next()
  } else {
    throw new HTTP401Error('Authentication failed for this protected route. Please Login and retry.')
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
