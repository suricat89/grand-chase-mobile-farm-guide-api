import {INTERNAL_SERVER_ERROR} from 'http-status';
import {Request, Response, NextFunction} from 'express';
import {
  BadRequest,
  Conflict,
  Forbidden,
  NotAcceptable,
  NotFound,
  PreconditionFailed,
  Unauthorized,
} from './errors';

export default (
  error:
    | BadRequest
    | Conflict
    | Forbidden
    | NotAcceptable
    | NotFound
    | PreconditionFailed
    | Unauthorized,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const code = error.statusCode || INTERNAL_SERVER_ERROR;
  const message = error.message || 'Internal Error';

  res.status(code).json({code, message});
  next(error);
};
