import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.BUYERS), orderController.createOrder);
router.get('/',auth(ENUM_USER_ROLE.ADMIN), orderController.getAllOrder);

export const OrderRoutes = router;
