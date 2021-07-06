import {UserProfile, UserSchema} from '../../../types';
import {encode} from '../../util/crypto';
import UserBusiness from '../user/user.business';
const userBusiness = new UserBusiness();

export const getUserData = async () => ({
  initialData: [
    {
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      password: await encode('123'),
      userName: 'initialUser',
      isActive: true,
      profile: UserProfile.user,
      isDeleted: false,
    },
    {
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      password: await encode('123'),
      userName: 'initialAdmin',
      isActive: true,
      profile: UserProfile.admin,
      isDeleted: false,
    },
  ] as UserSchema[],
  SIGNIN_S_001: {
    request: {
      userName: 'initialUser',
      password: '123',
    },
    response: {
      userName: 'initialUser',
      profile: UserProfile.user,
    },
  },
  SIGNIN_S_002: {
    request: {
      userName: 'initialAdmin',
      password: '123',
    },
    response: {
      userName: 'initialAdmin',
      profile: UserProfile.admin,
    },
  },
  SIGNIN_E_001: {
    request: {
      userName: 'userNotFound',
      password: '123',
    },
  },
  SIGNIN_E_002: {
    load: async () => {
      return createNewDeletedUser({
        userName: 'SIGNIN_E_002',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
    request: (userName: string) => ({
      userName,
      password: '123',
    }),
  },
  SIGNIN_E_003: {
    request: {
      userName: 'initialAdmin',
      password: 'wrongPassword',
    },
  },
  POST_S_001: {
    request: {
      userName: 'testUser1',
      password: '123',
      profile: 'user',
    },
  },
  POST_E_001: {
    request: {
      userName: 'initialUser',
      password: '123',
      profile: 'user',
    },
  },
  PUT_S_001: {
    load: async () => {
      return createNewUser({
        userName: 'PUT_S_001',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
    request: (id: string) => ({
      id,
      profile: 'user',
    }),
  },
  PUT_S_002: {
    load: async () => {
      return createNewUser({
        userName: 'PUT_S_002',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
    request: (id: string) => ({
      id,
      password: '1234',
    }),
  },
  PUT_S_003: {
    load: async () => {
      return createNewUser({
        userName: 'PUT_S_003',
        password: await encode('123'),
        profile: UserProfile.user,
      });
    },
    request: {
      userName: 'PUT_S_003',
      profile: 'admin',
    },
  },
  PUT_S_004: {
    load: async () => {
      return createNewUser({
        userName: 'PUT_S_004',
        password: await encode('123'),
        profile: UserProfile.user,
      });
    },
    request: {
      userName: 'PUT_S_004',
      password: '1234',
    },
  },
  PUT_E_001: {
    request: {
      userName: 'userNotFound',
      profile: 'admin',
    },
  },
  PUT_E_002: {
    request: {
      id: '7NbZB0RZc790PF9TeEIa',
      profile: 'admin',
    },
  },
  GET_S_002: {
    load: async () => {
      return createNewUser({
        userName: 'GET_S_002',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
  },
  GET_S_005: {
    load: async () => {
      return createNewDeletedUser({
        userName: 'GET_S_005',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
  },
  GET_S_006: {
    load: async () => {
      return createNewUser({
        userName: 'GET_S_006',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
  },
  DELETE_S_001: {
    load: async () => {
      return createNewUser({
        userName: 'DELETE_S_001',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
    request: (id: string) => ({
      id,
    }),
  },
  DELETE_S_002: {
    load: async () => {
      return createNewUser({
        userName: 'DELETE_S_002',
        password: await encode('123'),
        profile: UserProfile.admin,
      });
    },
    request: (userName: string) => ({
      userName,
    }),
  },
  DELETE_E_001: {
    request: {
      id: '7NbZB0RZc790PF9TeEIa',
    },
  },
  DELETE_E_002: {
    request: {
      userName: 'userNotFound',
    },
  },
});

const createNewUser = async (user: UserSchema) => {
  const newUser = await userBusiness.create(user);
  return newUser.records.pop();
};

const createNewDeletedUser = async (user: UserSchema) => {
  const createdUser = await userBusiness.create(user);
  const newUser = createdUser.records.pop();

  const deletedUser = await userBusiness.deleteUsingId(newUser.id);

  return deletedUser.records.pop();
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

const promise = getUserData();
export type IReturnGetUserData = ThenArg<typeof promise>;
