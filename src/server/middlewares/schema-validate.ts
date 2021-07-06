import {StatusCodes} from 'http-status-codes';
import {
  ObjectSchema,
  ValidationOptions,
  ValidationError,
  AlternativesSchema,
} from 'joi';
import {ValidateType} from '../../../types';
import {RequestHandler} from 'express';

export default (
  schema: ObjectSchema | AlternativesSchema,
  type: ValidateType,
  validateOptions?: ValidationOptions
): RequestHandler => {
  return async (req, res, next) => {
    const data = type === ValidateType.BODY ? req.body : req.query;

    try {
      await schema.validateAsync(data, {abortEarly: false, ...validateOptions});
      next();
    } catch (err) {
      let errors: string[] = [];
      let errMsg: string = err;
      if (err instanceof ValidationError) {
        errors = errors.concat(err.details.map(m => m.message));
        errMsg = errors.join(', ');
      }

      res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        error: errMsg,
      });
    }
  };
};
