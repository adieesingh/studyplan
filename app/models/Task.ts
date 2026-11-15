import { model, models, Schema } from "mongoose";

const taskSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    date:{type:String,required:true,match:/^\d{4}-\d{2}-\d{2}$/},
    text:{type:String,required:true,trim:true,maxlength:500},
    status:{type:String,enum:["pending","done","not_done"],default:"pending"},
    checkinAskedAt:{type:Date},
    completedAt:{type:Date}
},
{timestamps:true}
)       

taskSchema.index({userId:1,date:1});

export const Task =models.Task || model("Task",taskSchema);