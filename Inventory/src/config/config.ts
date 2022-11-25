import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

export const server = {
    port : parseInt(String(process.env.port)),
    secret : String(process.env.secret)
}

export const options = {
    root : String(process.env.ROOT),
    password : String(process.env.ROOT_PASSWORD),
    database : String(process.env.DATABASE),
    host : String(process.env.HOST)
}