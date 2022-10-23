import jwt from 'jsonwebtoken';
import { ErrorConstructor } from './errorHandler';
import {NextFunction, Request, Response} from "express";
import {eSasiadRequest, userModel} from "../routes/user/schema";
import {isValidObjectId} from "mongoose";

export default function authGuard(options?:{isInGroup?: boolean, isNotInGroup?: boolean}) {

    return async function guard(req: eSasiadRequest, res: Response, next: NextFunction){

        const auth = req.header('Authorization');
        if(!auth) {
            throw ErrorConstructor(1, 'Unauthorized', 401);
        }

        const userId = jwt.verify(auth, process.env.JWT_SECRET as string) as {id: string};

        if(!userId || !isValidObjectId(userId.id)) {
            throw ErrorConstructor(1, 'Unauthorized', 401);
        }

        const user = await userModel.findById(userId.id);

        if(!user || user.banned){
            throw ErrorConstructor(1, 'Unauthorized', 401);
        }

        if(options?.isInGroup === true && !user.usersGroup){
            throw ErrorConstructor(7, 'you must be a member of a group to access this resources', 403);
        }

        if(options?.isNotInGroup === true && user.usersGroup){
            throw ErrorConstructor(9, 'you must not be a member of a group to access this resources', 403);
        }

        req.user = user;
        next();
    }

}