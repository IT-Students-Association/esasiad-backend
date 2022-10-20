import Router from "express";
import {eSasiadRequest} from "../user/schema";
import authGuard from "../../utils/authGuard";
import {validate} from "express-validation";
import {getNearestGroups, postGroupSchema} from "./schema";
import GroupService from "./service";

const router = Router();
const group = new GroupService();

router.post('/new', authGuard, validate(postGroupSchema), async (req: eSasiadRequest, res) => {
    await group.create(req.body.centerCoordinates.latitude, req.body.centerCoordinates.longitude)
    return res.send();
})

router.get('/nearest', authGuard, validate(getNearestGroups), async (req: eSasiadRequest, res) => {
    const groups = await group.getNearestGroups(Number(req.query.lat), Number(req.query.lng));
    return res.json(groups);
})
export default router;