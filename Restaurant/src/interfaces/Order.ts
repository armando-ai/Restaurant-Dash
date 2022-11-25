import { ObjectId } from 'mongodb';
import item from './Item';

export default interface Order {
    _id: ObjectId;
    items_ordered: item[];
    price: number;
}