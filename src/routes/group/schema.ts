import {model, Schema} from "mongoose";
import {Joi} from "express-validation";

const groupSchema = new Schema({
    centerCoordinates: {
        latitude: {type: "number", required: true},
        longitude: {type: "number", required: true}
    }
});

export const groupModel = model('Group', groupSchema);

export interface IGroup {
    centerCoordinates: {
        latitude: number;
        longitude: number;
    }
}

export const postGroupSchema = {
    body: Joi.object({
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