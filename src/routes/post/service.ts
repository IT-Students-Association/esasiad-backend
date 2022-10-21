import {postModel} from "./schema";
import mongoose from "mongoose";
import {groupModel} from "../group/schema";
import {eSasiadError} from "../../utils/errorHandler";

export class postService{

    async createPost(postOptions: {content: string, title: string, groupId: mongoose.Types.ObjectId, authorId: mongoose.Types.ObjectId}){
        const group = await groupModel.findById(postOptions.groupId);
        if(!group){
            throw new eSasiadError(6, "Group not found");
        }
        const post = new postModel({content: postOptions.content, group: postOptions.groupId, author: postOptions.authorId, title: postOptions.title});
        await post.save();
    }
}