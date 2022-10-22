import Router from 'express';
import {ErrorCodes, ErrorConstructor, IError} from "../../utils/errorHandler";
import AuthService from "./service";
import fetch from 'cross-fetch';
import {activateSchema, loginSchema, registerSchema} from "./schema";
import {validate} from "express-validation";

async function recaptcha(token: string){
    console.log(token);

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    });

    return await response.json() as {success: true|false};

}

const router = Router();

/**
 *  @openapi
 *  /api/auth/register:
 *  post:
 *      tags:
 *          - auth
 *      summary: Register user
 *      description: Register new user in e-Sąsiad system
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/registerSchema'
 *      responses:
 *          200:
 *              description: successfully registered
 *          400:
 *              description: request is malformed
 *          401:
 *              description: user already exists
 */
router.post('/register', validate(registerSchema), async (req, res) => {

    const captcha = await recaptcha(req.body.captchaToken);
    console.log(captcha);
    if(!captcha.success){
        throw ErrorConstructor(3, 'Invalid captcha validation', 401);
    }

    const auth = new AuthService(req.body);
    await auth.register();
    return res.send({message: 'User registered successfully'});
})

/**
 *  @openapi
 *  /api/auth/login:
 *  post:
 *      tags:
 *         - auth
 *      summary: Login user
 *      description: Login user in e-Sąsiad system
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/loginSchema'
 *      responses:
 *          200:
 *              description: successfully logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/loggedSchema'
 *          400:
 *              description: request is malformed
 *          409:
 *              description: credentials are invalid or user is not allowed to login in e-Sąsiad system
 */
router.post('/login', validate(loginSchema), async (req, res) => {
    const auth = new AuthService(req.body);
    const token = await auth.login();
    return res.send({message: 'User logged in successfully', token: token});
})

/**
 *  @openapi
 *  /api/auth/activate:
 *  post:
 *      tags:
 *         - auth
 *      summary: Activate account
 *      description: Activate users account in e-Sąsiad system
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/activateSchema'
 *      responses:
 *          200:
 *              description: account successfully activated
 *          400:
 *              description: request is malformed
 *          409:
 *              description: token is invalid
 */
router.post('/activate', validate(activateSchema), async (req, res) => {
    const auth = new AuthService();
    await auth.activateUser(req.body.token);

    return res.send({message: 'Account activated successfully'});
})

export default router;