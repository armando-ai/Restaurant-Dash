import { Request, Response } from 'express';
import { user, init } from '../interfaces/User';
import bcrypt from 'bcryptjs';
import { server } from '../config/config';
import jwt from 'jsonwebtoken';
import database, { getEmail, getTokens } from '../database/User_Database';
import Credentials from '../interfaces/Credentials';
import license from '../interfaces/License';
import { request } from '../helpers/request';
import { register } from '../helpers/eureka';

setTimeout(() => {
    register('users', server.port);
}, 15000);


const login = async(req: Request, res: Response): Promise<Response> => {
    let temp = req.body as Credentials;

    if(Object.keys(temp).length === 0)
        return res.status(500).json({
            error : 'login was information was not sent',
        });
    const credentials = await database.login(temp);
    if(credentials === null)
        return res.status(500).json({
            error : 'no user was found'
        });
    if(bcrypt.compareSync(temp.password, credentials.password)) {
        const token = jwt.sign({
            id : credentials._id,
            license : { key : credentials.license.key }},
            server.secret,
            { expiresIn : 100 * 100 }
        );
        return res.status(200).json({
            auth: {
                id: token,
                license : credentials.license
            }
        });
    }
    return res.status(500).json({
        error : 'username or password were incorreect'
    });
}

const register_account = async(req: Request, res: Response): Promise<Response> => {
    let temp = req.body as user;
    if(Object.keys(temp).length === 0)
    return res.status(500).json({
        error : 'no data was sent',
        temp
    });
    const account = init(temp);
    
    if(await getEmail(account.email))
        return res.status(500).json({
            error: 'email already exists'
        });
    const key = req.body.license.key;
    if(key === '') {
        account.license.type = 'client';
    }
    if(key !== '') {
        const response = await request('http://gateway:8080/restaurants/keys', 'get', {
            data : { 
                key : key,
                restaurant: String(req.body.license.restaurant),
                secret : server.secret }
        });
        if(response) {
            const results = response.data as license[];
            if(results.length === 0)
                return res.status(500).json({
                    error: 'no matching key or that key is already in use'
                });
            for(let i = 0; i < results.length; i++) {
                if(results[i].key === key) {
                    account.license.key = results[i].key;
                    account.license.restaurant = results[i].restaurant;
                    account.license.type = 'business';
                    request('http://gateway:8080/restaurants/register', 'post', {
                        data: {
                            owner: account._id,
                            name: results[i].restaurant,
                            location : { formatted_address : account.location.formatted_address }
                        }
                    });
                    break;
                }
            }
            if(account.license.key === undefined)
                return res.status(500).json({
                    error : 'no matching key',
                    key
                });
        }
    }
    
    account.password = bcrypt.hashSync(account.password, 10);
    database.register(account);
    return res.status(200).json({
        account
    });
}

const getAllUsers = async(req: Request, res: Response): Promise<Response> => { return res.status(200).json(await database.getAllUsers())}

const getToken = async(req: Request, res: Response): Promise<Response> => {
    if(String(req.body.secret) === server.secret)
        return res.status(200).json(await getTokens(String(req.body.token)));
    return res.status(401).json('not authorized');
}

const getUser = async(req: Request, res: Response): Promise<Response> => {
    const user = await database.getUser(String(req.id));
    if(user) 
        return res.status(200).json(user);
    return res.status(200).json('no user was found');
}


export default { login, register_account, getAllUsers, getToken, getUser}