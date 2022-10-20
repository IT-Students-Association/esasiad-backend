import {ObjectId} from "mongodb"
import {userModel} from "./schema";
export class UserService{
    userId: string;
    constructor(userId: string){
        this.userId = userId;
    }

    async getMinified(){
        return userModel.findById(this.userId, 'name surname _id');
    }
}