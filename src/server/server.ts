'use strict';
import * as express from 'express';
import {Express} from 'express';
import * as pino from 'pino';
import * as pinoHttp from 'pino-http';
import * as cors from 'cors';

import routes from './routes';
import errorHandler from './error-handler';
import environment from '../config/environment';

const _app = express();
const logger = pino();

const _init = (): Promise<Express> => {
  return new Promise((resolve, reject) => {
    try {
      _app.use(cors());
      _app.use(pinoHttp({logger}));
      _app.use(express.json());

      routes(_app);

      _app.use(errorHandler);

      _app.listen(environment.application.port, () => resolve(_app));
    } catch (error) {
      reject(error);
    }
  });
};

export const initServer = async () => {
  return _init();
};
