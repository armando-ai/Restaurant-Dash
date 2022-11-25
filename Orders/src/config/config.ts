import dotenv from 'dotenv'
import path from 'path';
dotenv.config({ path: path.resolve(__dirname + './src/config/.env')})

export const mongodb = {
    database: String(process.env.database),
    port : parseInt(String(process.env.database_port)),
    username: String(process.env.username),
    password: String(process.env.password),
    host: String(process.env.host),
    collections: {
        orders: String(process.env.order_collection),
    },
    options : {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        retryWrites: true,
        minPoolSize: 10,
        maxPoolSize: 15
    },
}

export const server = {
    port: parseInt(String(process.env.port)),
    secret: String(process.env.secret),
}