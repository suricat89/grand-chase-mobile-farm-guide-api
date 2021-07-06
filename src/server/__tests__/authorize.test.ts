// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {initApp} from '../../server';
import {
  getEnvironmentData,
  ITestEnvironmentData,
} from '../../config/__data__/environment.data';
import {
  getAuthorizeData,
  IReturnAuthorizeData,
} from '../__data__/authorize.data';

let app: Express.Application;
let testEnvironment: ITestEnvironmentData;
let authorizeData: IReturnAuthorizeData;

beforeAll(async () => {
  app = await initApp();
  testEnvironment = await getEnvironmentData();
  authorizeData = await getAuthorizeData();
});

describe('Authorization error handling', () => {
  it(`[AUTHORIZE_E_001] [HTTP 403] should not allow a user
      to access a resource that requires admin rights`, async () => {
    const response = await agent(app)
      .get('/user?userName=initialUser')
      .set('Authorization', testEnvironment.users.user.token);

    expect(response.status).toEqual(StatusCodes.FORBIDDEN);
  });

  it(`[AUTHORIZE_E_002] [HTTP 403] should not allow anyone
      to access a private resource with an invalid token`, async () => {
    const response = await agent(app)
      .get('/user?userName=initialUser')
      .set('Authorization', authorizeData.AUTHORIZE_E_002.request);

    expect(response.status).toEqual(StatusCodes.FORBIDDEN);
  });

  it(`[AUTHORIZE_E_003] [HTTP 403] should not allow anyone
      to access a private resource without token`, async () => {
    const response = await agent(app).get('/user?userName=initialUser');

    expect(response.status).toEqual(StatusCodes.FORBIDDEN);
  });

  it(`[AUTHORIZE_E_004] [HTTP 403] should not allow anyone
      to access a private resource with a malformed token`, async () => {
    const response = await agent(app)
      .get('/user?userName=initialUser')
      .set('Authorization', authorizeData.AUTHORIZE_E_004.request);

    expect(response.status).toEqual(StatusCodes.FORBIDDEN);
  });
});
