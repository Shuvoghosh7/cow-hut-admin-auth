import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);
router.post(
  '/login',
  validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin
);

router.post(
  '/refresh-token',
  validateRequest(AdminValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);
router.get(
  '/',auth(ENUM_USER_ROLE.ADMIN), AdminController.getAllAdmin
);




export const AdminRoutes = router;
