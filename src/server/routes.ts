'use strict';
import userRouter from '../routes/user/user.route';
import {Router} from 'express';

const router = Router();
router.use('/user', userRouter);

export default router;
