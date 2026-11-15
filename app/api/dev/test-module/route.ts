import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/models/Task";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(){
    if(process.env.NODE_ENV !=="development"){
        return NextResponse.json({error:"Not Found"},{status:404})
    };
    await connectDB();

    const user = await User.create({
        email:`test${Date.now()}@example.com`,
        passwordHash:"not-a-real-hash"
    });
    const task = await Task.create({
        userId:user._id,
        date:"2026-11-15",
        text:"Study DSA 2 hour"
    });
    const found = await Task.findOne({userId:user._id,date:"2026-11-14"});
    await Task.deleteMany({userId:user._id});
    await User.deleteOne({_id:user._id});

    return NextResponse.json({ user,task,found})

}