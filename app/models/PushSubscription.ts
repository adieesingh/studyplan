import { model, models, Schema } from "mongoose";


const pushSchema = new Schema({
    userId:{types:Schema.Types.ObjectId,ref:"User",required:true,index:1},
    endpoint:{type:String,required:true,unique:true},
    keys:{
        p256dh:{type:String,required:true},
        auth:{type:String,required:true}
    },
    userAgent:{type:String}

},
{timestamps:true}
)

export const PushSubscription = models.PushSubscription || model("PushSubscription",pushSchema)