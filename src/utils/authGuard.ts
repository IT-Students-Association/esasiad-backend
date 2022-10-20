import jwt from 'jsonwebtoken';
import { ErrorConstructor } from './errorHandler';
import {NextFunction, Request, Response} from "express";
import {eSasiadRequest, userModel} from "../routes/user/schema";
import {isValidObjectId} from "mongoose";

export default async function authGuard(req: eSasiadRequest, res: Response, next: NextFunction) {
    const auth = req.header('Authorization');
    if(!auth) {
        throw ErrorConstructor(1, 'Unauthorized', 409);
    }

    const userId = jwt.verify(auth, process.env.JWT_SECRET as string) as {id: string};

    if(!userId || !isValidObjectId(userId.id)) {
        throw ErrorConstructor(1, 'Unauthorized', 409);
    }

    const user = await userModel.findById(userId.id);

    if(!user){
        throw ErrorConstructor(1, 'Unauthorized', 409);
    }

    req.user = user;

    next();

}