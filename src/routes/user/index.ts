import Router from "express";
import authGuard from "../../utils/authGuard";
import {eSasiadRequest} from "./schema";

const router = Router();

router.get('/me', authGuard, async (req: eSasiadRequest, res) => {
    return res.json(req.user);
})

export default router;