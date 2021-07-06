import Controller from '../../common/controller';
import UserBusiness from './user.business';
import {RequestHandler} from 'express';
import {UserSchema, BusinessEnvelope} from '../../../types';
import {StatusCodes} from 'http-status-codes';

export default class UserController extends Controller<UserSchema> {
  _userBusiness: UserBusiness;
  constructor() {
    super();
    this._userBusiness = new UserBusiness();
  }

  getUsers(): RequestHandler {
    return async (req, res) => {
      const userName = req.query.userName as string;
      const id = req.query.id as string;

      let user: BusinessEnvelope<UserSchema>;
      if (id) {
        user = await this._userBusiness.findUsingId(id);
      } else if (userName) {
        user = await this._userBusiness.findUsingUserName(userName);
      } else {
        user = await this._userBusiness.findAllUsers();
      }

      this.render(res)(user);
    };
  }

  postUser(): RequestHandler {
    return async (req, res) => {
      const user = await this._userBusiness.create(req.body);
      this.render(res)(user);
    };
  }

  putUser(): RequestHandler {
    return async (req, res) => {
      let user: BusinessEnvelope<UserSchema>;

      const userId = req.body.id;
      const userName = req.body.userName;
      if (userId) {
        delete req.body.id;
        user = await this._userBusiness.updateUsingId(userId, req.body);
      } else {
        user = await this._userBusiness.updateUsingUserName(userName, req.body);
      }

      this.render(res)(user);
    };
  }

  deleteUser(): RequestHandler {
    return async (req, res) => {
      let user: BusinessEnvelope<UserSchema>;

      const userId = req.body.id;
      const userName = req.body.userName;
      if (userId) {
        delete req.body.id;
        user = await this._userBusiness.deleteUsingId(userId);
      } else {
        user = await this._userBusiness.deleteUsingUserName(userName);
      }

      this.render(res)(user);
    };
  }

  postUserSignIn(): RequestHandler {
    return async (req, res) => {
      const userName = req.body.userName;
      const password = req.body.password;

      const token = await this._userBusiness.signInUser(userName, password);

      res.status(StatusCodes.OK).json({auth: true, token});
    };
  }
}
