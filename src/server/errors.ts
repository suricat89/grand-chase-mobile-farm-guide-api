import {StatusCodes} from 'http-status-codes';

export class CustomError extends Error {
  statusCode: number;
  constructor(statusCode = 500, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class Forbidden extends CustomError {
  constructor(message?: string) {
    super(StatusCodes.FORBIDDEN, message);
  }
}
export class NotFound extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}
export class BadRequest extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
export class Unauthorized extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
export class Conflict extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.CONFLICT, message);
  }
}
export class NotAcceptable extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.NOT_ACCEPTABLE, message);
  }
}
export class PreconditionFailed extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.PRECONDITION_FAILED, message);
  }
}

export class InternalServerError extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(StatusCodes.PRECONDITION_FAILED, message);
  }
}
