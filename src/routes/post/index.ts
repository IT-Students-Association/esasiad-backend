import { Router } from "express";
import authGuard from "../../utils/authGuard";
import {eSasiadRequest} from "../user/schema";
import {postService} from "./service";
import {validate} from "express-validation";
import {postPostSchema} from "./schema";

const router = Router();

const post = new postService();

router.post('/new', validate(postPostSchema), authGuard({isInGroup: true}),  async (req: eSasiadRequest, res)=>{

    await post.createPost({...req.body, authorId: req.user?._id, groupId: req.user?.usersGroup});
    return res.send({message: 'Post created successfully'});

});





export default router;