import swaggerJsdoc from 'swagger-jsdoc';
import { Router } from 'express';
import swaggerUi from "swagger-ui-express";
import {activateSchema} from "../routes/auth/schema";

const openApiOptions = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'e-Sąsiad API Documentation',
            version: '1.0.0',
        },
        components:{
            schemas:{
                registerSchema: {
                    type: Object,
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Jan'
                        },
                        surname: {
                            type: 'string',
                            example: 'Kowalski'
                        },
                        email: {
                            type: 'string',
                            example: 'jan.kowalski@domain.com'
                        },
                        password: {
                            type: 'string',
                            example: '!VeryStrongPassword123'
                        },
                        captchaToken: {
                            type: 'string',
                            example: '_CAPTCHA_TOKEN_'
                        },
                    }
                },

                loginSchema: {
                    type: Object,
                    properties: {
                        email: {
                            type: 'string',
                            example: 'jan.kowalski@domain.com'
                        },
                        password: {
                            type: 'string',
                            example: '!VeryStrongPassword123'
                        }
                    }
                },

                loggedSchema:{
                    type: Object,
                    properties: {
                        token: {
                            type: 'string',
                            example: '_JWT_TOKEN_'
                        }
                    }
                },

                activateSchema:{
                    type: Object,
                    properties: {
                        token: {
                            type: 'string',
                            example: '_ACTIVATE_TOKEN_'
                        }
                    }
                }




            }

        }
    },
    apis: ['./src/routes/*.ts', './src/routes/*/*.ts','./src/routes/*/*.js','./src/routes/*.js'],
};

const router = Router();

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swaggerJsdoc(openApiOptions)));

export default router;
