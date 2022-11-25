import { Request, Response } from 'express';
import Item from '../interfaces/Item';
import { update } from '../interfaces/Insert';
import Database, { updateItems } from '../database/InventoryDatabase';
import { register } from '../helpers/eureka';

setTimeout(() => {
    register('inventory', 4000);
}, 15000);


const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const initTable = (req: Request, res: Response): Response => {
    const name = req.body.id;
    Database.initTable(name);
    return res.status(200).json('done');
}

const getIngredients = (req: Request, res: Response) => {
    const name = req.body.id;
    let inventory: Item[] = [];
    Database.getIngredients(name, function(results: Item[]) {
        inventory = results;
    });
    setTimeout(() => {
        inventory === null ? res = res.status(500).json({
            error: 'the inventory you\'re looking for doesn\'t exist'
        }) :  res = res.status(200).json({ inventory : inventory });
        return res;
    }, 30);
    return;
}

const update = (req: Request, res: Response) => {
    const data: update = req.body;
    if(data.type === 'insert')
        Database.insert(data.db, data.inventory);
    if(data.type === 'update')
        Database.update(data.db, data.inventory);
    res.send('hi');
}

const madeOrder = async(req: Request, res: Response) => {
    const id = String(req.body.params.id);
    let data = new Set(req.body.data.ingredients.map((name: { name: string}) => { return name.name})) as Set<string>;
    const ingredients = req.body.data.ingredients;
    const names: string[] = Array.from(data);
    let inventory: Item[] = []
    Database.updateIngredients(names, id, function(results: Item[]) {
        inventory = results;
    });

    await sleep(50);

    let validOrder = true;
    for await(const item of inventory) {
        for await(const ingredient of ingredients) {
            if(item.name === ingredient.name) {
                let currentStock = item.stock - ingredient.stock;
                if(currentStock >= 0) 
                    item.stock = currentStock;
                else {
                    validOrder = false;
                }
            }
        };
    };
    if(validOrder)
        updateItems(id, inventory);
    return res.json(validOrder);
}

const getAllInventories = async(req: Request, res: Response) => {
    const owners: string[] = req.body.owners;
    let inventories: Item[][] = []
    owners.forEach(owner => {
        Database.getIngredients(owner, (results: Item[]) => {
            inventories.push(results);
        });
    })
    await sleep(50);

    return res.json(inventories);
}

export default { initTable, getIngredients, update, madeOrder, getAllInventories  };