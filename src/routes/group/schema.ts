import {model, Schema} from "mongoose";
import Joi from "../../utils/Joi";

const groupSchema = new Schema({
    title: {type: "string", required: true},
    loc: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, { timestamps: true });

groupSchema.index({loc: "2dsphere"});

export const groupModel = model<IGroup>('Group', groupSchema);

export interface IGroup {
    title: string;
    loc: {
        type: 'Point',
        coordinates: number[]
    }
}

export const postGroupSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        loc: Joi.object({
            lng: Joi.number().required(),
            lat: Joi.number().required()
        }).required()
    })
}

export const getNearestGroups = {
    query: Joi.object({
        lng: Joi.number().required(),
        lat: Joi.number().required()
    })
}

export const postJoinGroupSchema = {
    body: Joi.object({
        groupId: Joi.objectId().required()
    })
}