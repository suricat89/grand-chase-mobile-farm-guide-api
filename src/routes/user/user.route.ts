import {Router} from 'express';
import UserController from './user.controller';
import schemaValidate from '../../server/middlewares/schema-validate';
import {ValidateType} from '../../server/middlewares/types';
import {
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
  userSchema,
} from './user.schema';

const router = Router();
const _userController = new UserController();

router.get(
  '/',
  schemaValidate(getUserSchema, ValidateType.QUERY),
  _userController.getUsers()
);
router.post(
  '/',
  schemaValidate(userSchema, ValidateType.BODY),
  _userController.postUser()
);
router.put(
  '/',
  schemaValidate(updateUserSchema, ValidateType.BODY),
  _userController.putUser()
);
router.delete(
  '/',
  schemaValidate(deleteUserSchema, ValidateType.BODY),
  _userController.deleteUser()
);

export default router;
