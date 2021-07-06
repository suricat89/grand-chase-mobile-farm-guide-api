// eslint-disable-next-line node/no-unpublished-import
import UserBusiness from '../../routes/user/user.business';
import {UserProfile} from '../../../types';
import {Server} from 'http';
import {bootstrapServer} from '..';

describe('Bootstrap server', () => {
  let defaultAdminId: string;
  it('[SERVER_S_001] should create default admin', async () => {
    const userBusiness = new UserBusiness();

    const admin = await userBusiness.createDefaultAdmin();
    expect(admin.records).toHaveLength(1);
    defaultAdminId = admin.records[0].id;
    expect(admin.records[0].profile).toBe(UserProfile.admin);
  });

  it('[SERVER_S_002] should return already created default admin', async () => {
    const userBusiness = new UserBusiness();

    const admin = await userBusiness.createDefaultAdmin();
    expect(admin.records).toHaveLength(1);
    expect(admin.records[0].profile).toBe(UserProfile.admin);
    expect(admin.records[0].id).toBe(defaultAdminId);
  });

  it('[SERVER_S_003] should start server with success', async () => {
    let callbackInvoked = false;
    jest
      .spyOn(Server.prototype, 'listen')
      .mockImplementationOnce((handle, cb) => {
        callbackInvoked = true;
        cb();
        return this;
      });

    await bootstrapServer();
    expect(callbackInvoked).toBeTruthy();
  });
});
