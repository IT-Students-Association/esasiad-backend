import {Request} from "express";
import mongoose, {model, Schema, Document} from "mongoose";
import {Joi as JoiStandard} from "express-validation";

const Joi = {...JoiStandard, objectId: require('joi-objectid')(JoiStandard)};

const userSchema = new Schema({
    name: {type: "string", required: true},
    surname: {type: "string", required: true},
    email: {type: "string", required: true, unique: true},
    password: {type: "string", required: true, select: false},
    active: {type: "boolean", required: true, default: false},
    banned: {type: "boolean", required: true, default: false},
    usersGroup: {type: mongoose.Types.ObjectId}
}, { timestamps: true });

export interface IUser extends Document{
    name: string,
    surname: string,
    email: string,
    active: boolean,
    banned: boolean,
    password?: string;
    usersGroup?: mongoose.Types.ObjectId;
}

export const userModel = model<IUser>('User', userSchema);


export interface eSasiadRequest extends Request{
    user?: IUser
}

export const getUserSchema = {
    params: Joi.object({
        userId: Joi.objectId().required()
    })
}