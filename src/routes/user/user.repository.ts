import Repository from '../../common/repository';
import RepositoryQuery from '../../common/repositoryQuery';
import environment from '../../config/environment';
import {UserSchema} from './types';

const getUserNameQuery = (userName: string) => [
  new RepositoryQuery('userName', '==', userName),
  new RepositoryQuery('isDeleted', '==', false),
];

export default class UserRepository extends Repository<UserSchema> {
  constructor() {
    super(environment.firestore.collectionUsers!);
  }

  async findUserByUserName(userName: string) {
    return this.find(getUserNameQuery(userName));
  }

  async updateUserByUserName(userName: string, model: UserSchema) {
    const users = await this.findUserByUserName(userName);

    if (users.length === 1) {
      return this.update(users.pop()!.id!, model);
    } else {
      throw new Error(`Found ${users.length} with the provided userName!`);
    }
  }

  async deleteUserByUserName(userName: string) {
    const users = await this.findUserByUserName(userName);

    if (users.length === 1) {
      return this.delete(users.pop()!.id!);
    } else {
      throw new Error(`Found ${users.length} with the provided userName!`);
    }
  }
}
