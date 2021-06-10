'use strict';
import userRouter from '../routes/user/user.route';
import {Express} from 'express';

/**
 * @param {import('express').Express} app
 * @param {any} opts
 */
export default (app: Express) => {
  app.use('/user', userRouter);
};
