import { Router } from 'express';
import controller from '../controller/order.controller';

const router = Router();

router.get('/orders?:id', controller.getOrder);
router.get('/orders/user/orders?:id', controller.getUserOrders);
router.get('/orders/status/:status/:id', controller.getByStatus);

router.post('/orders', controller.createOrder);

router.patch('/orders/update?:id', controller.updateOrder);

export = router;