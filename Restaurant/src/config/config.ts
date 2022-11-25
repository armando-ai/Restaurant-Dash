import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path : path.resolve(__dirname, '.env.config')});

export const server = {
    port : parseInt(String(process.env.port)) || 3500,
    secret : String(process.env.secret)
}

console.log(process.env.mongo_url);

export const mongo = {
    url : String(process.env.mongo_url),
    database : String(process.env.mongo_database),
    collections : {
        licenses : String(process.env.mongo_collection_licenses),
        restaurants: String(process.env.mongo_collection_restaurants)
    },
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