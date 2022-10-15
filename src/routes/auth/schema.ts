import {Joi} from "express-validation";

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