import express, {Request, Response, NextFunction} from 'express';
require('express-async-errors');
import server from './utils/server';
import dotenv from 'dotenv';
import routes from './routes';
import swagger from "./utils/swagger";
import * as mongoose from "mongoose";
import errorHandler, {ErrorCodes, IError} from "./utils/errorHandler";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/esasiadDB`).then(()=>{
    server.log('Successfully connected to server');
}).catch(err => server.log(err));

app.use(bodyParser.json());

app.use('/api-docs', swagger);

app.use('/api', routes);

app.use(errorHandler);


app.listen(process.env.PORT, () => {
    server.log(`Application started successfully on port ${process.env.PORT}`);
});
