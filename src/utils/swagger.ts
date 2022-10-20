import swaggerJsdoc from 'swagger-jsdoc';
import { Router } from 'express';
import swaggerUi from "swagger-ui-express";

const openApiOptions = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'e-Sąsiad API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts', './src/routes/*/*.ts','./src/routes/*/*.js','./src/routes/*.js'],
};

const router = Router();

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swaggerJsdoc(openApiOptions)));

export default router;
