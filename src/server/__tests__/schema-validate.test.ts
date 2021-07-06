// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {initApp} from '..';
import {
  getSchemaValidateData,
  IReturnSchemaValidateData,
} from '../__data__/schema-validate.data';

let app: Express.Application;
let schemaValidateData: IReturnSchemaValidateData;

beforeAll(async () => {
  app = await initApp();
  schemaValidateData = await getSchemaValidateData();
});

describe('Validate schema with errors', () => {
  it(`[VALIDATE_E_001] [HTTP 400] should raise an error if there are
      fields missing in request`, async () => {
    const response = await agent(app)
      .post('/user/signIn')
      .send(schemaValidateData.VALIDATE_E_001.request);

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
