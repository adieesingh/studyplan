import { Schema } from "mongoose";

const MessageSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    role:{type:String,enum:["user","ai"],required:true},
    text:{type:String,required:true,maxlength:4000},
    taskId:{type:Schema.Types.ObjectId,ref:"Task"}
})