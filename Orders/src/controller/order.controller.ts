import { Request, Response } from 'express';
import { register } from '../helpers/eureka';
import orderService from '../service/order.service';
import { Order } from '../models/order.model';

setTimeout(() => {
    register('orders', 4500);
}, 15000);

const getOrder = async(req: Request, res: Response) => {
    const id = String(req.query.id);
    const order = await orderService.findOne(id);
    if(order)
        return res.status(200).json(order);
    return res.status(500).json('order could not be found');
}

const getUserOrders = async(req: Request, res: Response) => {
    const id = String(req.query.id);
    const user_data = await orderService.getUser(id);
    if(user_data) {
        const user_id = user_data.data._id;
        const orders = await orderService.getUserOrders(user_id);
        const pending: Order[] = [], progress: Order[] = [], completed: Order[] = [];
        orders.forEach(order => {
            if(order.order_status === 'Pending')
            pending.push(order);
            if(order.order_status === 'In-Progress')
                progress.push(order);
            if(order.order_status === 'Completed')
                completed.push(order);
        });
        return res.status(200).json({
            pending: pending,
            'In-Progress': progress,
            completed: completed
        });
    }
    return res.status(500).json('no user found');
}

const getByStatus = async(req: Request, res: Response) => {
    const { status, id } = req.params;
    const user_data = await orderService.getUser(String(id));
    if(user_data) {
        const user_id = String(user_data.data._id);
        const rest_data = await orderService.getRestaurant(user_id);
        if(rest_data) {
            const rest_id = rest_data.data.id;
            if(status === undefined)
                return res.status(500).json('status is undefined');
            const orders = await orderService.findByStatus(rest_id._id, String(status));
            console.log(orders);
            return res.status(200).json(orders);
        }
    }
}

const updateOrder = async(req: Request, res: Response) => {
    const { id } = req.query;
    const orderToBeUpdated = await orderService.findOne(String(id));
    if(orderToBeUpdated) {
        const status = orderToBeUpdated.order_status;
        switch(status) {
            case 'Pending':
                return res.status(200).json(await orderService.updateOrder(String(id), { $set: {order_status: 'In-Progress' }}));
            case 'In-Progress':
                return res.status(200).json(await orderService.updateOrder(String(id), { $set: {order_status: 'Completed' }}));
            default:
                return res.status(500).json('order does not exist');
        }
    }
    return res.status(500).json('no order could be found');
}

const createOrder = async(req: Request, res: Response) => {
    const order = req.body as Order;
    order.date = new Date();
    const token = String(order.user_id);
    const user_data = await orderService.getUser(token);
    if(user_data) {
        order.user_id = user_data.data._id;
        const response = await orderService.makeOrder(order.restaurant_id, order.items);
        if(response) 
            if(response.data === true) {
                orderService.create(order);
                return res.status(200).json('order has been created');
            }
    }
    return res.status(500).json('order has been cancelled due to an insufficent inventory');
}

export default { getOrder, getUserOrders, getByStatus, updateOrder, createOrder, }