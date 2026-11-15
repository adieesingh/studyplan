import {model,models,Schema} from "mongoose";


const userSchema = new Schema(
    {
        email:{type:String,required:true,unique:true,lowerCase:true,trim:true},
        name:{type:String,trim:true},
        passwordHash:{type:String,required:true},
        timezone:{type:String,default:"Asia/Kolkata"},
        reminder:{
            enabled:{type:String,default:true},
            interalMin:{type:Number,default:30},
            quietStart:{type:String,default:"23:00"},
            quietEnd:{type:String,default:"07:00"},
            checkinTime:{type:String,default:"21:00"}
        },
        plan:{type:String,enum:["free","pro"],default:"free"},
        lastNotifiedAt:{type:Date},
    },
    {timestamps :true}

);

export const User = models.User || model("User",userSchema);