import {Request, RequestHandler} from 'express';
import {verify, VerifyCallback} from 'jsonwebtoken';
import environment from '../../config/environment';
import {UserProfile} from '../../../types';
import {Forbidden} from '../errors';

interface AuthenticatedProperties {
  userName: string;
  profile: UserProfile;
}
interface RequestAuthenticated extends Request {
  authenticated?: AuthenticatedProperties;
}

const authorize = (...permissions: UserProfile[]): RequestHandler => {
  return async (req: RequestAuthenticated, res, next) => {
    await _validateToken(req);
    if (
      permissions.some(permission => req.authenticated!.profile === permission)
    ) {
      next();
    } else {
      throw new Forbidden('Usuário não autorizado');
    }
  };
};

const _validateToken = async (req: Request) => {
  const token = _extractToken(req);
  if (token) {
    verify(token, environment.security.jwt.secretKey, _applyBearer(req));
  } else {
    throw new Forbidden('Token inválido');
  }
};

const _extractToken = (req: Request) => {
  let token;
  const authorization = req.header('authorization');
  if (authorization) {
    const parts = authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
    return token;
  } else return;
};

const _applyBearer = (req: RequestAuthenticated): VerifyCallback => {
  return (error, decoded) => {
    if (error) {
      throw new Forbidden(error.message);
    }

    req.authenticated = decoded as AuthenticatedProperties;
  };
};

export default authorize;
