import {StatusCodes} from 'http-status-codes';
import {ErrorRequestHandler} from 'express';
import {CustomError} from './errors';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let code = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';

  if (error instanceof CustomError) {
    code = error.statusCode;
    message = error.message;
  }

  res.status(code).json({code, error: message});
  next(error);
};
