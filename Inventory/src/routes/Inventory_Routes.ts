import { Router } from 'express';
import controller from '../controller/InventoryController';
import { verify } from '../middleware/verify';

const router = Router();

// router.get('/', controller.insert);
router.get('/ingredients', controller.getIngredients);
router.get('/all/inventories', controller.getAllInventories);

router.post('/initTable', controller.initTable);

router.patch('/update', controller.update);
router.patch('/restaurant/order?:id', controller.madeOrder);


export = router;