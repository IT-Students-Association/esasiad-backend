import Router, {Response} from "express";
import authGuard from "../../utils/authGuard";
import {eSasiadRequest, getUserSchema} from "./schema";
import {validate} from "express-validation";
import {UserService} from "./service";

const router = Router();

/**
 *  @openapi
 *  /api/user/me:
 *  get:
 *      tags:
 *          - user
 *      summary: Get information about user
 *      description: Get all information about user
 *
 *      responses:
 *          200:
 *              description: user successfully retrieved
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          400:
 *              description: request is malformed
 *          401:
 *              description: unauthorized
 */
router.get('/me',authGuard() ,async (req: eSasiadRequest, res: Response) => {
    return res.json(req.user);
});

/**
 *  @openapi
 *  /api/user/{userId}:
 *  get:
 *      tags:
 *          - user
 *      summary: Get minified information about user
 *      description: Get minified information about user
 *
 *      responses:
 *          200:
 *              description: user successfully retrieved
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/minifiedUser'
 *          400:
 *              description: request is malformed
 *          401:
 *              description: unauthorized
 */
router.get('/:userId', authGuard(), validate(getUserSchema), async (req: eSasiadRequest, res: Response)=>{
    const user = new UserService(req.params.userId);
    return res.json(await user.getMinified());
})

export default router;