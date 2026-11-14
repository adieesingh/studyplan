import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/lib/db";

export async function GET(){
    try {
        await connectDB();
        await mongoose.connection.db!.admin().ping();
        return NextResponse.json({ok:true});    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ok:false},{status:500})

    }
}