// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {initApp} from '../../server';
import {IJwtTokenContent} from '../user/user.business';
import {UserSchema, BusinessEnvelope} from '../../../types';
import {
  getEnvironmentData,
  ITestEnvironmentData,
} from '../../config/__data__/environment.data';
import {getUserData, IReturnGetUserData} from '../__data__/user.data';
import {match} from '../../util/crypto';
import {decode} from 'jsonwebtoken';
import environment from '../../config/environment';

let app: Express.Application;
let testEnvironment: ITestEnvironmentData;
let userData: IReturnGetUserData;

beforeAll(async () => {
  app = await initApp();
  testEnvironment = await getEnvironmentData();
  userData = await getUserData();
});

describe('POST /user/signIn', () => {
  describe('Sign in with success', () => {
    it('[SIGNIN_S_001] [HTTP 200] should sign in with no expiration', async () => {
      environment.security.jwt.expiresIn = undefined;
      const response = await agent(app)
        .post('/user/signIn')
        .send(userData.SIGNIN_S_001.request);

      expect(response.status).toEqual(StatusCodes.OK);

      const decodedToken = decode(response.body.token) as IJwtTokenContent;
      expect(decodedToken).toMatchObject(userData.SIGNIN_S_001.response);
      expect(decodedToken.exp).toBeUndefined();
    });

    it('[SIGNIN_S_002] [HTTP 200] should sign in with expiration set', async () => {
      const currentDate = new Date();
      const currentUtc = Math.trunc(currentDate.valueOf() / 1000);
      const expirationUtc = currentUtc + 24 * 60 * 60;

      environment.security.jwt.expiresIn = '1d';
      const response = await agent(app)
        .post('/user/signIn')
        .send(userData.SIGNIN_S_002.request);
      environment.security.jwt.expiresIn = undefined;

      expect(response.status).toEqual(StatusCodes.OK);

      const decodedToken = decode(response.body.token) as IJwtTokenContent;
      expect(decodedToken).toMatchObject(userData.SIGNIN_S_002.response);
      expect(decodedToken.exp).toBeGreaterThanOrEqual(expirationUtc);
    });
  });

  describe('Sign in with error', () => {
    it(`[SIGNIN_E_001] [HTTP 401] should raise an error if "userName"
        does not exists`, async () => {
      const response = await agent(app)
        .post('/user/signIn')
        .send(userData.SIGNIN_E_001.request);

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
    });

    it(`[SIGNIN_E_002] [HTTP 401] should raise an error if the user
        was deleted`, async () => {
      const user = await userData.SIGNIN_E_002.load();

      const response = await agent(app)
        .post('/user/signIn')
        .send(userData.SIGNIN_E_002.request(user.userName));

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
    });

    it(`[SIGNIN_E_003] [HTTP 401] should raise an error if password
        is incorrect`, async () => {
      const response = await agent(app)
        .post('/user/signIn')
        .send(userData.SIGNIN_E_003.request);

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
    });
  });
});

describe('POST /user', () => {
  describe('Insert user with success', () => {
    test('[POST_S_001] [HTTP 200] should insert a new user', async () => {
      const response = await agent(app)
        .post('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.POST_S_001.request);

      expect(response.status).toEqual(StatusCodes.OK);
    });
  });

  describe('Insert user with error', () => {
    test(`[POST_E_001] [HTTP 412] should raise an error if user already
          exists`, async () => {
      const response = await agent(app)
        .post('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.POST_E_001.request);

      expect(response.status).toEqual(StatusCodes.PRECONDITION_FAILED);
    });
  });
});

describe('PUT /user', () => {
  describe('Update user with success', () => {
    test(`[PUT_S_001] [HTTP 200] should update an user profile using
          the "id"`, async () => {
      const user = await userData.PUT_S_001.load();

      const response = await agent(app)
        .put('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.PUT_S_001.request(user.id));

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      expect(response.body.records[0].profile).toBe('user');
    });

    test(`[PUT_S_002] [HTTP 200] should update an user password using
          the "id"`, async () => {
      const user = await userData.PUT_S_002.load();

      const response = await agent(app)
        .put('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.PUT_S_002.request(user.id));

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      const passwordMatch = await match(
        '1234',
        response.body.records[0].password
      );
      expect(passwordMatch).toBeTruthy();
    });

    test(`[PUT_S_003] [HTTP 200] should update an user profile using
          the "userName"`, async () => {
      await userData.PUT_S_003.load();

      const response = await agent(app)
        .put('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.PUT_S_003.request);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      expect(response.body.records[0].profile).toBe('admin');
    });

    test(`[PUT_S_004] [HTTP 200] should update an user password using
          the "userName"`, async () => {
      await userData.PUT_S_004.load();

      const response = await agent(app)
        .put('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.PUT_S_004.request);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      const passwordMatch = await match(
        '1234',
        response.body.records[0].password
      );
      expect(passwordMatch).toBeTruthy();
    });
  });

  describe('Update user with error', () => {
    test(`[PUT_E_001] [HTTP 404] should raise an error if no user was
         found with provided userName`, async () => {
      const response = await agent(app)
        .put('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.PUT_E_001.request);

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
    });

    test(`[PUT_E_002] [HTTP 404] should raise an error if no user was
          found with provided id`, async () => {
      const response = await agent(app)
        .put('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.PUT_E_002.request);

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
    });
  });
});

describe('GET /user', () => {
  describe('List user with success', () => {
    test(`[GET_S_001] [HTTP 200] should get a single user with provided
         "userName"`, async () => {
      const response = await agent(app)
        .get('/user?userName=initialUser')
        .set('Authorization', testEnvironment.users.admin.token);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      expect(response.body.records[0].userName).toBe('initialUser');
    });

    test(`[GET_S_002] [HTTP 200] should get a single user with provided
         "id"`, async () => {
      const user = await userData.GET_S_002.load();

      const response = await agent(app)
        .get(`/user?id=${user.id}`)
        .set('Authorization', testEnvironment.users.admin.token);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      expect(response.body.records[0].id).toBe(user.id);
    });

    test('[GET_S_003] [HTTP 200] should get a list with all users', async () => {
      const response = await agent(app)
        .get('/user')
        .set('Authorization', testEnvironment.users.admin.token);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records.length).toBeGreaterThan(1);
    });

    test(`[GET_S_004] [HTTP 204] should return no content when no
          user was found using "id"`, async () => {
      const response = await agent(app)
        .get('/user?id=7NbZB0RZc790PF9TeEIa')
        .set('Authorization', testEnvironment.users.admin.token);

      expect(response.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test(`[GET_S_005] [HTTP 204] should return no content when the
          user with provided "id" has been deleted`, async () => {
      const user = await userData.GET_S_005.load();
      const response = await agent(app)
        .get(`/user?id=${user.id}`)
        .set('Authorization', testEnvironment.users.admin.token);

      expect(response.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test(`[GET_S_006] [HTTP 200] should return just users that
          was not deleted`, async () => {
      await userData.GET_S_006.load();
      const response = await agent(app)
        .get('/user')
        .set('Authorization', testEnvironment.users.admin.token);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.records.length).toBeGreaterThan(1);

      const returnedEnvelope = response.body as BusinessEnvelope<UserSchema>;
      const returnedUsers = returnedEnvelope.records;
      const deletedUsers = returnedUsers.filter(user => user.isDeleted);
      expect(deletedUsers).toHaveLength(0);
    });
  });
});

describe('DELETE /user', () => {
  describe('Delete user with success', () => {
    it('[DELETE_S_001] [HTTP 200] should delete user using his "id"', async () => {
      const user = await userData.DELETE_S_001.load();

      const response = await agent(app)
        .delete('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.DELETE_S_001.request(user.id));

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      expect(response.body.records[0].id).toBe(user.id);
    });

    it('[DELETE_S_002] [HTTP 200] should delete user using his "userName"', async () => {
      const user = await userData.DELETE_S_002.load();

      const response = await agent(app)
        .delete('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.DELETE_S_002.request(user.userName));

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.records).toHaveLength(1);
      expect(response.body.records[0].userName).toBe(user.userName);
    });
  });

  describe('Delete user with error', () => {
    it(`[DELETE_E_001] [HTTP 404] should raise an error if the "id"
        was not found`, async () => {
      const response = await agent(app)
        .delete('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.DELETE_E_001.request);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it(`[DELETE_E_002] [HTTP 404] should raise an error if the "userName"
        was not found`, async () => {
      const response = await agent(app)
        .delete('/user')
        .set('Authorization', testEnvironment.users.admin.token)
        .send(userData.DELETE_E_002.request);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
