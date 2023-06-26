import express from 'express';
import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cow.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLERS),
  CowController.createCow
);
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.BUYERS,ENUM_USER_ROLE.SELLERS), CowController.getSingleCow);
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLERS),
  CowController.updateCow
);
router.delete('/:id',auth(ENUM_USER_ROLE.SELLERS), CowController.deleteCow);
router.get('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.BUYERS,ENUM_USER_ROLE.SELLERS), CowController.getAllCow);

export const CowRoutes = router;
