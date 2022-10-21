import {Joi} from "express-validation";
import {model, Schema} from "mongoose";

export const registerSchema = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}/)
            .required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        captchaToken: Joi.string().required()
    })
}

export const loginSchema = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}

export const activateSchema = {
    body: Joi.object({
        token: Joi.string().required(),
    })
}

const activateTokenSchema = new Schema({
    user: {type: "string", required: true},
    token: {type: "string", required: true, unique: true}
}, { timestamps: true })

export const activateTokenModel = model('activateToken', activateTokenSchema);