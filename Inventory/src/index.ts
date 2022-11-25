import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { server } from './config/config';
import routes from './routes/Inventory_Routes';
const port = server.port || 4000;

const app = express();

declare global {
    namespace Express {
        export interface Request {
            id?: string
        }
    }
}

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});