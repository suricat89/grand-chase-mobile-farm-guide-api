'use strict';
import express, {Application} from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import cors from 'cors';
import 'express-async-errors';

import router from './routes';
import {errorHandler} from './error-handler';
import environment from '../config/environment';
import UserBusiness from '../routes/user/user.business';

export const initApp = async (): Promise<Application> => {
  const app = express();
  const logger = pino();

  app.use(cors());
  app.use(pinoHttp({logger}));
  app.use(express.json());

  app.use(router);

  app.use(errorHandler);

  return app;
};

export const bootstrapServer = async () => {
  const app = await initApp();

  const userBusiness = new UserBusiness();
  await userBusiness.createDefaultAdmin();

  app.listen(environment.application.port, () => {
    console.log(`Server listening on port ${environment.application.port}`);
  });
};
