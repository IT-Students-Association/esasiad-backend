import Router, { NextFunction, Request, Response } from 'express';
import {ValidationError} from "express-validation";

export enum ErrorCodes {
    userAlreadyExists,
    unauthorized,
    activationTokenNotValid,
    invalidCaptchaValidation,
    invalidCoordinates,
    groupAlreadyExists,
    groupNotFound,
    notAGroupMember,
    postAlreadyLikedOrNotExists,
    alreadyGroupMember
}

export interface IError {
    httpErrorCode: number;
    errorCode: ErrorCodes;
    message: string;
}

export function ErrorConstructor(errorCode: ErrorCodes, message: string, httpErrorCode?: number){
    return {
        httpErrorCode: httpErrorCode?httpErrorCode:409,
        errorCode: errorCode,
        message: message
    } as IError;
}

export class eSasiadError{
    constructor(errorCode: ErrorCodes, message: string, httpErrorCode?: number){
        return {
            httpErrorCode: httpErrorCode?httpErrorCode:409,
            errorCode: errorCode,
            message: message
        } as IError;
    }
}


export default function errorHandler(err: IError | any, req: Request, res: Response, next: NextFunction){
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    if(err.httpErrorCode !== undefined && err.errorCode !== undefined && err.message !== undefined){
        return res.status(err.httpErrorCode).json({code: err.errorCode, message: err.message});
    }

    console.error(err);

    return res.status(500).json(err);
};
