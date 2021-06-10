import {CustomFirestoreModel} from '../../common/types';

export enum UserProfile {
  admin,
  user,
}

export interface UserSchema extends CustomFirestoreModel {
  userName: string;
  profile: UserProfile;
  password: string;
}
