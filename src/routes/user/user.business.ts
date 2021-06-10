import {BadRequest} from 'http-errors';
import Business from '../../common/business';
import {FullCustomModel} from '../../common/types';
import {UserSchema} from './types';
import UserRepository from './user.repository';

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
    )) as FullCustomModel<UserSchema>[];

    return this.envelope(users);
  }

  async create(user: UserSchema) {
    const userExists = await this._userRepository.findUserByUserName(
      user.userName
    );
    if (userExists.length) {
      throw new BadRequest('Invalid userName. User already exists');
    }

    const createdUser = await this._userRepository.create(user);

    return this.envelope(createdUser);
  }

  async updateUsingId(id: string, user: UserSchema) {
    const updatedUser = await this._userRepository.update(id, user);

    return this.envelope(updatedUser);
  }

  async updateUsingUserName(userName: string, user: UserSchema) {
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
}
