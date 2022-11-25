import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { server } from '../config/config';
import { request } from '../helpers/request';
import { Restaurant, init } from '../interfaces/Restaurant';
import database, { keys } from '../database/Restaurant_Database';
import Recipe from '../interfaces/Item';
import Ingredient from '../interfaces/Ingredient';
import { register } from '../helpers/eureka';
import axios from 'axios';

setTimeout(() => {
    register('restaurants', 3500);
}, 15000);

const getKeys = async(req: Request, res: Response): Promise<Response> => {
    if(String(req.body.secret) === server.secret )
        return res.status(200).json(await keys(String(req.body.key), String(req.body.restaurant))); 
    return res.status(401).json('not authorized');
};

const registerRestaurant = async(req: Request, res: Response) => {
    const temp = req.body as Restaurant;
    const restaurant = init(temp);
    database.initRestaurant(restaurant);
    request('http://gateway:8080/inventory/initTable', 'post', {
        data: {
            id: new ObjectId(restaurant.owner)
        }
    });

    return res.status(200).json(restaurant);
}

const getInventory = async(req: Request, res: Response): Promise<Response> => {
    const response = await request('http://gateway:8080/inventory/ingredients', 'get', {
        data : {
            id : req.id
        }
    });

    if(response !== undefined)
        return res.status(200).json(response.data.inventory);
    return res.status(500).json('no inventory found');
}

const updateInventory = async(req: Request, res: Response): Promise<Response | void> => {
    type update = {
        ingredients: [{ name: string, stock: number }];
        type: string;
    }
    let inventory: [string, number][] = [];
    const data = req.body as update;
    if(data.ingredients.length === 1)
        inventory = [[data.ingredients[0].name, data.ingredients[0].stock]];
    else 
        data.ingredients.forEach(item => inventory.push([item.name, item.stock]));
    const response = await request('http://gateway:8080/inventory/update', 'patch', {
        data: {
            db: req.id,
            inventory: inventory,
            type: data.type
        }
    });
    if(response !== undefined)
        return res.json(response.data);
    return res.json('could not update inventory');
}

const addRecipe = async(req: Request, res: Response) => {
    const temp = req.body;
    const recipe = temp.recipe as Recipe;
    const id = String(req.id);
    
    const newIngredients = (): boolean => {
        let bool = false;
        recipe.ingredients.forEach(ingredient => {
            if(ingredient.new)
                bool = true;
        });
        return bool;
    }

    if(newIngredients()) {
        type insertFormat = [string, number][];
        const ingredients: insertFormat = [];
        recipe.ingredients.forEach(ingredient => {
            if(ingredient.new === true) {
                delete ingredient.new;
                ingredients.push([ingredient.name, 0]);
            }
                
        });
        request(`http://gateway:8080/inventory/update?id=${String(req.query.id)}`, 'patch', {
            data: {
                db: id,
                inventory: ingredients,
                type: 'insert'
            }
        });
    }
    database.addRecipe(id, recipe);

    res.sendStatus(200);
}

const makeOrder = async(req: Request, res: Response) => {
    const { items, restaurant_id } = req.body.data;
    const restaurant = await database.getRestaurantById(restaurant_id);
    const orders: [Recipe, number | undefined][] = []
    restaurant.menu_items.forEach(item => {
        items.forEach((order: Recipe) => {
            if(item.dish_name === order.dish_name)
                orders.push([item, order.quantity]);
        });
    });
    const ingredients: { name: string; stock: number }[] = [];
    orders.forEach(order => {
        order[0].ingredients.forEach(ingredient => {
            //@ts-ignore
            ingredients.push({ name: ingredient.name, stock: order[1] *  ingredient.stock})
        });
    });
    const response = await axios.patch(`http://gateway:8080/inventory/restaurant/order`, {
        data: {
            ingredients: ingredients
        },
        params: {
            id : restaurant.owner
        }
    });
    if(response)
        return res.status(200).json(response.data);
    return res.status(200).json('invalid inventory');
    
}

const getRestaurantByItem = async(req: Request, res: Response) => {
    const { item, restaurant } = req.body;
    return res.json(await database.getRestaurantByItem(String(item), String(restaurant)));
}

const getBusinessDishes = async(req: Request, res: Response) => {
    return res.status(200).json(await database.getDishes(String(req.id)));
}

const getDishes = async(req: Request, res: Response) => {
    return res.status(200).json(await database.getDishes(String(req.body.id)));
}

const updateDish = async(req: Request, res: Response) => {
    const id = String(req.id);
    const dish = req.body.recipe as Recipe;

    database.updateDish(id, dish);
    return res.status(200).json('updated');
}

const getCuisineArrays = async(req: Request, res: Response) => {
    type restaurant = {
        restaurant: Restaurant;
        inventory: Ingredient[];
    }
    const establishments: restaurant[] = [];
    const temp = await database.getMenuItems() as Restaurant[];
    const owners = temp.map(restaurant => { return restaurant.owner });
    const response = await request('http://gateway:8080/inventory/all/inventories', 'get', {
        data: {
            owners : owners
        }
    });
    if(response) {
        for(let i = 0; i < temp.length; i++) {
            establishments.push({ restaurant: temp[i], inventory: response.data[i] });
        }

        const allItems: any = {};
        type restaurantMenu = { id: ObjectId; name: string; menu_items: Recipe[] };

        for(let i = 0; i < establishments.length; i++) {
            const restaurant = establishments[i].restaurant;
            const inventory = establishments[i].inventory;
            restaurant.menu_items.forEach(item => {
                item.ingredients.forEach(itemIngredient => {
                    for(let j = 0; j < inventory.length; j++) {
                        //@ts-ignore
                        if(inventory[j].stock - itemIngredient.stock < 0) {
                            item.available = false;
                            break;
                        }
                        item.available = true;
                    }
                });
            });
            restaurant.menu_items.forEach(menuItem => {
                if(menuItem.cuisine in allItems) {
                    if(allItems[menuItem.cuisine].length >= 1) {
                        allItems[menuItem.cuisine].forEach((rest: restaurantMenu) => {
                            if(rest.name === restaurant.name) 
                                rest.menu_items.push(menuItem);
                            else 
                                allItems[menuItem.cuisine].push([{ id: restaurant._id, name: restaurant.name, menuItem: [menuItem]}]);
                            
                        });
                    }
                } else {
                    allItems[menuItem.cuisine] = [{ id: restaurant._id, name: restaurant.name, menu_items: [menuItem] }];
                }
            });
        }

        return res.json(allItems);
    }
    return res.status(200).json([]);
}

const getRestaurantById = async(req: Request, res: Response) => {
    return res.status(200).json({ id: await database.returnId(req.body.id)});
}

const searchQuery = async(req: Request, res: Response) => {
    const keyword = String(req.body.keyword);
    const type = String(req.body.type);
    return res.status(200).json(await database.query(type, keyword));
}

export default { getKeys, registerRestaurant, getInventory, updateInventory, addRecipe,
    getRestaurantByItem, updateDish, getDishes, getBusinessDishes, getCuisineArrays, getRestaurantById,
    makeOrder, searchQuery, }