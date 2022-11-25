import express from 'express';
import routes from './routes/router';
import cors from 'cors';
import { server } from './config/config';

declare global {
    namespace Express {
        export interface Request {
            id?: string;
        }
    }
}

const port = server.port;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
