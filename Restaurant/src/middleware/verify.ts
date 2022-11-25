import { Request, Response, NextFunction } from 'express';
import { request } from '../helpers/request';
import { server } from '../config/config';
import jwt from 'jsonwebtoken';

export const verify = async(req: Request, res: Response, next: NextFunction) => {
    const token = String(req.query.id);
    if(token !== undefined) {
        const response = await request('http://gateway:8080/users/token', 'get', {
            data : { token : token, secret : server.secret } 
        });
        if(response !== undefined)
            if(response.data) {
                const user =(<jwt.JwtPayload> jwt.verify(token, server.secret));
                if(user.license.key === undefined)
                    return res.status(401).json('not authorized');
                req.id = String(user.id);
                return next();
            }
    }
    return res.status(401).json({
        error : 'not logged in',
        url: 'http://192.168.1.2:5000/Login'
    });
};