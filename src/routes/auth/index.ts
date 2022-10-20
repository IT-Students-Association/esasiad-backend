import Router from 'express';
import {ErrorCodes, ErrorConstructor, IError} from "../../utils/errorHandler";
import AuthService from "./service";
import fetch from 'cross-fetch';
import {activateSchema, loginSchema, registerSchema} from "./schema";
import {validate} from "express-validation";

async function recaptcha(token: string){

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST', body: JSON.stringify({
            secret: process.env.RECAPTCHA_SECRET,
            response: token
        })
    });

    return await response.json() as {success: true|false};

}

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     description: Register new user in e-Sąsiad system
 *     responses:
 *       200:
 *         description: Returns if successfully registered
 *       400:
 *         description: When request is malformed
 *       409:
 *         description: Returns if user already exists
 */
router.post('/register', validate(registerSchema), async (req, res) => {

    const captcha = await recaptcha(req.body.captchaToken);
    console.log(captcha);
    if(!captcha.success){
        throw ErrorConstructor(3, 'Invalid captcha validation', 401);
    }

    const auth = new AuthService(req.body);
    await auth.register();
    return res.status(200).send({message: 'User registered successfully'});
})


router.post('/login', validate(loginSchema), async (req, res) => {
    const auth = new AuthService(req.body);
    const token = await auth.login();
    return res.status(200).send({message: 'User logged in successfully', token: token});
})

router.post('/activate', validate(activateSchema), async (req, res) => {
    const auth = new AuthService();
    await auth.activateUser(req.body.token);

    return res.status(200).send({message: 'Account activated successfully'});
})

export default router;