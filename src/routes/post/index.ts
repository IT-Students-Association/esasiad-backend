import { Router } from "express";
import authGuard from "../../utils/authGuard";
import {eSasiadRequest} from "../user/schema";
import {postService} from "./service";
import {validate} from "express-validation";
import {likePostSchema, postPostSchema} from "./schema";
import {ObjectId} from "mongodb";

const router = Router();

const post = new postService();

router.post('/new', authGuard({isInGroup: true}), validate(postPostSchema),  async (req: eSasiadRequest, res)=>{

    await post.createPost({...req.body, authorId: req.user?._id, groupId: req.user?.usersGroup});
    return res.send({message: 'Post created successfully'});

});

// router.get('/all', authGuard({isInGroup: true}), validate(likePostSchema),  async (req: eSasiadRequest, res)=>{
//
// });

router.post('/like', authGuard({isInGroup: true}), validate(likePostSchema),  async (req: eSasiadRequest, res)=>{

    await post.likePost(req.body.postId, req.user?._id);
    return res.send({message: 'Post liked successfully'});

});





export default router;