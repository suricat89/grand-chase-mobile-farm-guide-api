'use strict';
import userRouter from '../routes/user/user.route';
import {Router} from 'express';

const router = Router();
router.get('/ping', (req, res) => {
  res.send('pong');
});
router.use('/user', userRouter);

export default router;
