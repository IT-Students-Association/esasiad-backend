import {postModel} from "./schema";
import mongoose, {ObjectId} from "mongoose";
import {groupModel} from "../group/schema";
import {eSasiadError} from "../../utils/errorHandler";

export class postService{

    async createPost(postOptions: {content: string, title: string, groupId: ObjectId, authorId: ObjectId}){
        const group = await groupModel.findById(postOptions.groupId);
        if(!group){
            throw new eSasiadError(6, "Group not found");
        }
        const post = new postModel({content: postOptions.content, group: postOptions.groupId, author: postOptions.authorId, title: postOptions.title, likes: [], comments: []});
        await post.save();
    }

    async likePost(postId: ObjectId, userId: ObjectId){
        const post = await groupModel.findOne({_id: postId, likes: userId});
        if(post){
            throw new eSasiadError(8, 'Post already liked or not exists');
        }
        await groupModel.findByIdAndUpdate(postId, {$push:{likes: userId}});

    }
}