import Repository from '../../common/repository';
import RepositoryQuery from '../../common/repositoryQuery';
import environment from '../../config/environment';
import {NotFound} from '../../server/errors';
import {UserSchema} from '../../../types';

const getUserNameQuery = (userName: string) => [
  new RepositoryQuery('userName', '==', userName),
  new RepositoryQuery('isDeleted', '==', false),
];

export default class UserRepository extends Repository<UserSchema> {
  constructor() {
    super(environment.firestore.collections.users);
  }

  async findUserByUserName(userName: string) {
    return this.find(getUserNameQuery(userName));
  }

  async updateUserByUserName(userName: string, model: UserSchema) {
    const users = await this.findUserByUserName(userName);

    if (!users.length) {
      throw new NotFound('Username not found');
    }

    return this.update(users.pop()!.id!, model);
  }

  async deleteUserByUserName(userName: string) {
    const users = await this.findUserByUserName(userName);

    if (!users.length) {
      throw new NotFound('Username not found');
    }

    return this.delete(users.pop()!.id!);
  }
}
