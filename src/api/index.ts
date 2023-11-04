import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import usersMethods from "./users.methods";
import statusMethods from "./status.methods";
import orgMethods from './org.methods';

export const createAPI = () => {
    const port = process.env.REST_PORT ?? 3000;
    const app = express();
    const router = express.Router();

    app.use(cors());
    app.use(
        bodyParser.urlencoded({
            extended: false,
        }),
    );

    statusMethods(router);
    usersMethods(router);
    orgMethods(router);

    app.use('/api', router);

    app.listen(port, () => {
        console.log(`REST API starting at ${port}`);
    });
}
