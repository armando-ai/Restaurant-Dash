import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

export const server = {
    port : parseInt(String(process.env.port)),
    secret : String(process.env.secret)
}

export const mongo = {
    database : String(process.env.mongo_database),
    collections : {
        users : String(process.env.mongo_collection_users),
        tokens : String(process.env.mongo_collection_tokens)
    },    
    url : String(process.env.mongo_url),
    options : {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        retryWrites: true,
        minPoolSize: 10,
        maxPoolSize: 15
    }
}