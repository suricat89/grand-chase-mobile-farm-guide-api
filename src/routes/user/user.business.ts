import Business from '../../common/business';
import {CustomFirestoreModel} from '../../../types';
import {
  encode as encodePassword,
  match as matchPassword,
} from '../../util/crypto';
import {sign, SignOptions} from 'jsonwebtoken';
import {UserProfile, UserSchema} from '../../../types';
import UserRepository from './user.repository';
import environment from '../../config/environment';
import {PreconditionFailed, Unauthorized} from '../../server/errors';

export interface IJwtTokenContent {
  userName: string;
  profile: UserProfile;
  iat: number;
  exp?: number;
}

export default class UserBusiness extends Business<UserSchema> {
  _userRepository: UserRepository;
  constructor() {
    super();
    this._userRepository = new UserRepository();
  }

  async findAllUsers() {
    const users = await this._userRepository.find();

    return this.envelope(users);
  }

  async findUsingUserName(userName: string) {
    const users = await this._userRepository.findUserByUserName(userName);

    return this.envelope(users);
  }

  async findUsingId(id: string) {
    const users = (await this._userRepository.findById(
      id
    )) as CustomFirestoreModel<UserSchema>[];

    return this.envelope(users);
  }

  async create(user: UserSchema) {
    const userExists = await this._userRepository.findUserByUserName(
      user.userName
    );
    if (userExists.length) {
      throw new PreconditionFailed('Invalid userName. User already exists');
    }

    user.password = await encodePassword(user.password);

    const createdUser = await this._userRepository.create(user);

    return this.envelope(createdUser);
  }

  async createDefaultAdmin() {
    const adminExists = await this.findUsingUserName('admin');

    if (adminExists.records.length) {
      return adminExists;
    }

    return this.create({
      userName: 'admin',
      password: environment.security.defaultAdmin.password,
      profile: UserProfile.admin,
    });
  }

  async updateUsingId(id: string, user: UserSchema) {
    if (user.password) {
      user.password = await encodePassword(user.password);
    }

    const updatedUser = await this._userRepository.update(id, user);

    return this.envelope(updatedUser);
  }

  async updateUsingUserName(userName: string, user: UserSchema) {
    if (user.password) {
      user.password = await encodePassword(user.password);
    }

    const updatedUser = await this._userRepository.updateUserByUserName(
      userName,
      user
    );

    return this.envelope(updatedUser);
  }

  async deleteUsingId(id: string) {
    const deletedUser = await this._userRepository.delete(id);

    return this.envelope(deletedUser);
  }

  async deleteUsingUserName(userName: string) {
    const deletedUser = await this._userRepository.deleteUserByUserName(
      userName
    );

    return this.envelope(deletedUser);
  }

  async signInUser(userName: string, password: string) {
    const user = (
      await this.findUsingUserName(userName)
    ).records.pop() as UserSchema;

    if (!user) {
      throw new Unauthorized('Invalid username/password');
    }
    const passwordMatch = await matchPassword(password, user.password);
    if (!passwordMatch) {
      throw new Unauthorized('Invalid username/password');
    }

    const jwtOptions: SignOptions = {};
    if (environment.security.jwt.expiresIn) {
      jwtOptions.expiresIn = environment.security.jwt.expiresIn;
    }

    const token = sign(
      {
        userName,
        profile: user.profile,
      } as IJwtTokenContent,
      environment.security.jwt.secretKey,
      jwtOptions
    );

    return token;
  }
}
