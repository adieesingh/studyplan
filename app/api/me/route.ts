import { getUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){
    const user = await getUser(req);
    if(!user){return NextResponse.json({error:"Authorized"},{status:401})};
    return NextResponse.json({user})
}