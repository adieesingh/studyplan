import { model, models, Schema } from "mongoose";

const messageSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    role:{type:String,enum:["user","ai"],required:true},
    text:{type:String,required:true,maxlength:4000},
    taskId:{type:Schema.Types.ObjectId,ref:"Task"}
},
{timestamps:true}
)

messageSchema.index({userId:1,createdAt:-1});
export const Message = models.Message || model("Message",messageSchema);

