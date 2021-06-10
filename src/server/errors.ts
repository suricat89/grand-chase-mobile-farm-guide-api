import {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  PRECONDITION_FAILED,
  UNAUTHORIZED,
} from 'http-status';

export class Forbidden extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = FORBIDDEN;
  }
}
export class NotFound extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = NOT_FOUND;
  }
}
export class BadRequest extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = BAD_REQUEST;
  }
}
export class Unauthorized extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = UNAUTHORIZED;
  }
}
export class Conflict extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = CONFLICT;
  }
}
export class NotAcceptable extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = NOT_ACCEPTABLE;
  }
}
export class PreconditionFailed extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = PRECONDITION_FAILED;
  }
}
