import { Router, Request, Response } from 'express';
import controller from '../controller/Restaurant';
import { verify } from '../middleware/verify';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    return res.send('hello');
});
router.get('/keys', controller.getKeys);
router.get('/inventory?:id', verify, controller.getInventory);
router.get('/restaurant', controller.getRestaurantByItem);
router.get('/restaurant/dishes', controller.getDishes);
router.get('/restaurants/dishes', verify, controller.getBusinessDishes);
router.get('/menuItems', controller.getCuisineArrays);
router.get('/getRestaurant', controller.getRestaurantById);
router.get('/query', controller.searchQuery);

router.patch('/updateInventory', verify, controller.updateInventory);
router.patch('/update/dish', verify, controller.updateDish);
router.patch('/order', controller.makeOrder);

router.post('/register', controller.registerRestaurant);
router.post('/addRecipe', verify, controller.addRecipe);

export = router;