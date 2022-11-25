import express, { Request, Response } from 'express';
import { server } from './config/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/Restaurant_Routes';
const port = server.port;

declare global {
    namespace Express {
        export interface Request {
            id?: string
        }
    }
}


const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});