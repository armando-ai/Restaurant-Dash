import { ObjectId } from 'mongodb';
import item from '../interfaces/Item';

export default interface Coupon { 
    _id : ObjectId;
    title : string;
    item : item;
    discount : number;
};