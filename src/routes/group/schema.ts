import {model, Schema} from "mongoose";
import Joi from "../../utils/Joi";

const groupSchema = new Schema({
    title: {type: "string", required: true},
    centerCoordinates: {
        latitude: {type: "number", required: true},
        longitude: {type: "number", required: true}
    }
}, { timestamps: true });

export const groupModel = model('Group', groupSchema);

export interface IGroup {
    centerCoordinates: {
        latitude: number;
        longitude: number;
    }
}

export const postGroupSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        centerCoordinates: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }).required()
    })
}

export const getNearestGroups = {
    query: Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required()
    })
}

export const postJoinGroupSchema = {
    body: Joi.object({
        groupId: Joi.objectId().required()
    })
}