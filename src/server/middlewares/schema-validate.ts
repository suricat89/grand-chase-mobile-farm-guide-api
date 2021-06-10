import {BAD_REQUEST} from 'http-status';
import {
  ObjectSchema,
  ValidationOptions,
  ValidationError,
  AlternativesSchema,
} from 'joi';
import {ValidateType} from './types';
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
      if (err instanceof ValidationError) {
        if (err.details?.length) {
          errors = errors.concat(err.details.map(m => m.message));
        }

        res.status(BAD_REQUEST).json({
          code: BAD_REQUEST,
          message: errors.join(', '),
        });
      } else {
        res.status(BAD_REQUEST).json({
          code: BAD_REQUEST,
          errors: err,
        });
      }
    }
  };
};
