import { Item } from './item.model';

export interface Order {
    order_status: string;
    date: Date;
    restaurant_name: string;
    items: Item[];
    total: number;
    user_id: string;
    restaurant_id: string;
}