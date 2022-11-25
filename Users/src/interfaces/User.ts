import { ObjectId } from 'mongodb';
import Order from './Order';
import item from './Item';
import coupon from './Coupon';
import license from './License';

export interface user {
    _id : ObjectId;
    name : string;
    email : string;
    password : string;
    license : license
    coupons ?: coupon[];
    order_history?: Order[];
    location : {
        type: string;
        formatted_address : string;
        coords : { lat : number, lng : number } | { }
    }
}

export const init = (options?: Partial<user>): user => {
    return { 
        _id : new ObjectId(),
        name : options?.name,
        email : options?.email,
        password : options?.password,
        license : {
            type : options?.license?.key === undefined ? 'personal' : 'business'
        },
        location : {
            type : 'Point',
            formatted_address : options?.location?.formatted_address,
            coords : { }
        }
    } as user;
};
