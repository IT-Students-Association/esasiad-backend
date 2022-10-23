import swaggerJsdoc from 'swagger-jsdoc';
import {Router} from 'express';
import swaggerUi from "swagger-ui-express";
import {activateSchema} from "../routes/auth/schema";
import schemas from "./schemas/schemas";

const openApiOptions = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'e-Sąsiad API Documentation',
            version: '1.0.0',
        },
        components: {
            schemas: {
                ...schemas
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                }

            }
        }
    },
    apis: ['./src/routes/*.ts', './src/routes/*/*.ts', './routes/*/*.js', './routes/*.js'],
};

const router = Router();

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swaggerJsdoc(openApiOptions)));

export default router;
