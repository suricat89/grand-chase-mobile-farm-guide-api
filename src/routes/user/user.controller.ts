import Controller from '../../common/controller';
import UserBusiness from './user.business';
import {RequestHandler} from 'express';
import {UserSchema} from './types';

export default class UserController extends Controller<UserSchema> {
  _userBusiness: UserBusiness;
  constructor() {
    super();
    this._userBusiness = new UserBusiness();
  }

  getUsers(): RequestHandler {
    return async (req, res, next) => {
      try {
        const userName = req.query.userName as string;
        const id = req.query.id as string;

        let user;
        if (id) {
          user = await this._userBusiness.findUsingId(id);
        } else if (userName) {
          user = await this._userBusiness.findUsingUserName(userName);
        } else {
          user = await this._userBusiness.findAllUsers();
        }

        this.render(res)(user);
      } catch (error) {
        next(error);
      }
    };
  }

  postUser(): RequestHandler {
    return async (req, res, next) => {
      try {
        const user = await this._userBusiness.create(req.body);
        this.render(res)(user);
      } catch (error) {
        next(error);
      }
    };
  }

  putUser(): RequestHandler {
    return async (req, res, next) => {
      try {
        let user;

        const userId = req.body.id;
        const userName = req.body.userName;
        if (userId) {
          delete req.body.id;
          user = await this._userBusiness.updateUsingId(userId, req.body);
        } else {
          user = await this._userBusiness.updateUsingUserName(
            userName,
            req.body
          );
        }

        this.render(res)(user);
      } catch (error) {
        next(error);
      }
    };
  }

  deleteUser(): RequestHandler {
    return async (req, res, next) => {
      try {
        let user;

        const userId = req.body.id;
        const userName = req.body.userName;
        if (userId) {
          delete req.body.id;
          user = await this._userBusiness.deleteUsingId(userId);
        } else {
          user = await this._userBusiness.deleteUsingUserName(userName);
        }

        this.render(res)(user);
      } catch (error) {
        next(error);
      }
    };
  }
}
