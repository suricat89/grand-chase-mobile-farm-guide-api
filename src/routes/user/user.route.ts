import {Router} from 'express';
import UserController from './user.controller';
import schemaValidate from '../../server/middlewares/schema-validate';
import {ValidateType, UserProfile} from '../../../types';
import {
  deleteUserSchema,
  getUserSchema,
  signInSchema,
  updateUserSchema,
  userSchema,
} from './user.schema';
import authorize from '../../server/middlewares/authorize';

const router = Router();
const _userController = new UserController();

router.get(
  '/',
  authorize(UserProfile.admin),
  schemaValidate(getUserSchema, ValidateType.QUERY),
  _userController.getUsers()
);
router.post(
  '/',
  authorize(UserProfile.admin),
  schemaValidate(userSchema, ValidateType.BODY),
  _userController.postUser()
);
router.put(
  '/',
  authorize(UserProfile.admin),
  schemaValidate(updateUserSchema, ValidateType.BODY),
  _userController.putUser()
);
router.delete(
  '/',
  authorize(UserProfile.admin),
  schemaValidate(deleteUserSchema, ValidateType.BODY),
  _userController.deleteUser()
);

router.post(
  '/signIn',
  schemaValidate(signInSchema, ValidateType.BODY),
  _userController.postUserSignIn()
);

export default router;
