import mongoose, {model, Schema} from "mongoose";
import Joi from "../../utils/Joi";

const postSchema =  new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Types.ObjectId, required: true},
    group: {type: mongoose.Types.ObjectId, required: true},
    likes: [{type: mongoose.Types.ObjectId, required: true}],
    comments: [{
        content: {type: String, required: true},
        author: {type: mongoose.Types.ObjectId, required: true}
    }]
}, { timestamps: true});

export const postModel = model("Post", postSchema);

export const postPostSchema = {
    body: Joi.object({
        title: Joi.string().required().max(160),
        content: Joi.string().required().max(1024)
    })
}

export const likePostSchema = {
    body: Joi.object({
        postId: Joi.objectId().required()
    })
}