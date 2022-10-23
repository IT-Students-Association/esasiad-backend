import Router, {Response} from "express";
import {eSasiadRequest} from "../user/schema";
import authGuard from "../../utils/authGuard";
import {validate} from "express-validation";
import {getNearestGroups, postGroupSchema, postJoinGroupSchema} from "./schema";
import GroupService from "./service";
import {UserService} from "../user/service";

const router = Router();
const group = new GroupService();

/**
 *  @openapi
 *  /api/group/new:
 *  post:
 *      tags:
 *         - group
 *      summary: Create a new group
 *      description: Create a new group in e-Sąsiad system
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postGroupSchema'
 *      responses:
 *          200:
 *              description: group successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/successfullyCreatedGroup'
 *          400:
 *              description: request is malformed
 *          403:
 *              description: user is already a group member
 *          409:
 *              description: group already exists in this area
 */
router.post('/new', authGuard({ isNotInGroup: false }), validate(postGroupSchema), async (req: eSasiadRequest, res: Response) => {
    const createdGroup = await group.create(req.body.loc.lng, req.body.loc.lat, req.body.title);
    return res.send({message: 'Group successfully created', groupId: createdGroup._id});
})

/**
 *  @openapi
 *  /api/group/nearest:
 *  get:
 *      tags:
 *          - group
 *      summary: Get nearest group
 *      description: Get nearest group
 *      parameters:
 *        - name: lng
 *          in: query
 *          required: true
 *          schema:
 *              example: 21.008171527406613
 *        - name: lat
 *          in: query
 *          required: true
 *          schema:
 *              example: 52.23007481762713
 *      responses:
 *          200:
 *              description: group successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/successfullyCreatedGroup'
 *          400:
 *              description: request is malformed
 *          403:
 *              description: user is already a group member
 *          409:
 *              description: group already exists in this area
 */
router.get('/nearest', authGuard(), validate(getNearestGroups), async (req: eSasiadRequest, res: Response) => {
    const groups = await group.getNearestGroups(Number(req.query.lng), Number(req.query.lat));
    return res.send(groups);
})

/**
 *  @openapi
 *  /api/group/join:
 *  post:
 *      tags:
 *          - group
 *      summary: Join group
 *      description: Join group in e-Sąsiad system
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/joinGroupSchema'
 *      responses:
 *          200:
 *              description: group successfully assigned to user
 *          400:
 *              description: request is malformed
 *          401:
 *              description: unauthorized
 */
router.post('/join', authGuard(), validate(postJoinGroupSchema), async (req: eSasiadRequest, res: Response) => {
    const foundGroup = await group.findGroupById(req.body.groupId);
    await req.user?.update({usersGroup: foundGroup});
    return res.send({message: 'Group successfully assigned to the user'});
});


export default router;