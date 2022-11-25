import express, { application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { server } from './config/config';
import cors from 'cors';
import routes from './routes/user_routes';

declare global {
    namespace Express {
        export interface Request {
            id?: string;
        }
    }
}

const port = server.port;
const app = express();


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
