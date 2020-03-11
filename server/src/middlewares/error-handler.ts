import { Request, Response, NextFunction, Router, Error } from "express";
import * as ErrorHandlers from "../lib/ErrorHandler";

function handle404Error (router: Router) {
  router.use((req: Request, res: Response) => {
    ErrorHandlers.notFoundError();
  });
};

function handleClientErrors (router: Router) {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandlers.clientError(err, res, next);
  });
};

function handleServerErrors (router: Router) {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandlers.serverError(err, res, next)
  });
};

export default [handle404Error, handleClientErrors, handleServerErrors];