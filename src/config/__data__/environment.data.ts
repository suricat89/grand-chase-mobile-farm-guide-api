import environment from '../../config/environment';
import {UserProfile} from '../../../types';
import UserBusiness from '../../routes/user/user.business';
import {getUserData} from '../../routes/__data__/user.data';

export interface ITestEnvironmentData {
  users: {
    admin: {
      userName: string;
      password: string;
      token: string;
      expiredToken: string;
    };
    user: {
      userName: string;
      password: string;
      token: string;
    };
  };
}

export const getEnvironmentData = async (): Promise<ITestEnvironmentData> => {
  const userBusiness = new UserBusiness();
  const userData = await getUserData();

  const adminUser = userData.initialData
    .filter(user => user.profile === UserProfile.admin)
    .pop();
  const adminUserName = adminUser.userName;
  const adminPassword = '123';
  const adminToken = await userBusiness.signInUser(
    adminUserName,
    adminPassword
  );

  environment.security.jwt.expiresIn = '0s';
  const expiredToken = await userBusiness.signInUser(
    adminUserName,
    adminPassword
  );
  environment.security.jwt.expiresIn = undefined;

  const nonAdminUser = userData.initialData
    .filter(user => user.profile === UserProfile.user)
    .pop();
  const nonAdminUserName = nonAdminUser.userName;
  const nonAdminPassword = '123';
  const nonAdminToken = await userBusiness.signInUser(
    nonAdminUserName,
    nonAdminPassword
  );

  return {
    users: {
      admin: {
        userName: adminUserName,
        password: adminPassword,
        token: `Bearer ${adminToken}`,
        expiredToken: `Bearer ${expiredToken}`,
      },
      user: {
        userName: nonAdminUserName,
        password: nonAdminPassword,
        token: `Bearer ${nonAdminToken}`,
      },
    },
  };
};
