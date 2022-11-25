import { ObjectId } from 'mongodb';
import item from './Item'
import coupon from './Coupon';

export interface Restaurant {
    _id : ObjectId,
    name : string,
    menu_items : item[],
    coupons : coupon[],
    location : {
        type : string,
        formatted_address : string,
        coords : number[]
    }
    owner: ObjectId
};

export const init = (options?: Partial<Restaurant>): Restaurant => {
    return {
        _id : new ObjectId(),
        name : options?.name,
        menu_items: [],
        coupons: [],
        location: {
            type: 'Point',
            formatted_address: options?.location?.formatted_address,
            coords: []
        },
        owner: options?.owner
    } as Restaurant;
};