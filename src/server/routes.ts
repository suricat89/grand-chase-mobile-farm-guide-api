'use strict';
import {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import userRouter from '../routes/user/user.route';

const router = Router();
const swaggerDocument = yaml.load('src/docs/swagger.yml');

router.get('/ping', (req, res) => {
  res.send('pong');
});
router.use('/user', userRouter);
router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: 'Grand Chase Mobile: Farm Guide',
  })
);

export default router;
