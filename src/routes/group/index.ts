import Router from "express";
import {eSasiadRequest} from "../user/schema";
import authGuard from "../../utils/authGuard";
import {validate} from "express-validation";
import {getNearestGroups, postGroupSchema, postJoinGroupSchema} from "./schema";
import GroupService from "./service";
import {UserService} from "../user/service";

const router = Router();
const group = new GroupService();

router.post('/new', authGuard, validate(postGroupSchema), async (req: eSasiadRequest, res) => {
    await group.create(req.body.centerCoordinates.latitude, req.body.centerCoordinates.longitude, req.body.title);
    return res.send({message: 'Group successfully created'});
})

router.get('/nearest', authGuard, validate(getNearestGroups), async (req: eSasiadRequest, res) => {
    const groups = await group.getNearestGroups(Number(req.query.lat), Number(req.query.lng));
    return res.send(groups);
})

router.post('/join', authGuard, validate(postJoinGroupSchema), async (req: eSasiadRequest, res) => {
    const foundGroup = await group.findGroupById(req.body.groupId);
    await req.user?.update({usersGroup: foundGroup});
    return res.send({message: 'Group successfully assigned to the user'});
});



export default router;