import Router from "express";
import authGuard from "../../utils/authGuard";
import {eSasiadRequest, getUserSchema} from "./schema";
import {validate} from "express-validation";
import {UserService} from "./service";
import {ObjectId} from "mongodb";

const router = Router();

router.get('/me', authGuard, async (req: eSasiadRequest, res) => {
    return res.json(req.user);
});

router.get('/:userId', authGuard, validate(getUserSchema), async (req: eSasiadRequest, res)=>{
    const user = new UserService(req.params.userId);
    return res.json(await user.getMinified());
})

export default router;