import { MongoClient, ObjectId } from 'mongodb';
import { mongodb } from '../config/config';
import { Order } from '../models/order.model';
import { Item } from '../models/item.model';
import { request } from '../helpers/request';
import axios from 'axios';
const { username, password, host, database, options, collections, port } = mongodb;

const client = new MongoClient(`mongodb://${username}:${password}@${host}:${port}`, options);
const db = client.db(database);
const collection = db.collection(collections.orders);
client.connect();

const create = (order: Order) => {
    collection.insertOne(order);
}

const getUserOrders = async(id: string) => {
    return await collection.find({ user_id : id }).toArray() as unknown as Order[];
}

const findByStatus = async(id: string, status: string) => {
    return await collection.find({
        $and: [
            { order_status: status },
            { restaurant_id: id}
        ]
    }).toArray() as unknown as Order[];
}

const updateOrder = async(id: string, update: {}) => {
    await collection.updateOne({ _id : new ObjectId(id)}, update);
}

const findAll = async() => {
    return await collection.find({}).toArray() as unknown as Order[];
}

const findOne = async(id: string) => {
    return await collection.findOne({ _id: new ObjectId(id) }) as unknown as Order;
}

const getUser = async(token: string) => {
    return await axios.get('http://gateway:8080/users/user', {
        params: { id: token }
    });
}

const getRestaurant = async(id: string) => {
    return await axios.get('http://gateway:8080/restaurants/getRestaurant', {
        data: { id: id }
    });
}

const makeOrder = async(restaurant_id: string, items: Item[]) => {
    return await axios.patch('http://gateway:8080/restaurants/order', {
        data : {
            restaurant_id: restaurant_id,
            items: items,
        }
    });
}

export default { create, getUserOrders, findByStatus, updateOrder,
    findAll, findOne, getUser, getRestaurant, makeOrder }