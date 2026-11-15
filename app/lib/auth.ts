import {jwtVerify, SignJWT} from "jose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "./db";
import { User } from "../models/User";
const secret = process.env.JWT_SECRET;

if(!secret) throw new Error("JWT not found in .env");
const key = new TextEncoder().encode(secret);

export const COOKIE_NAME="token";
const MAX_AGE= 60 * 60 * 24 * 30; // 30 days

export async function signToken(userId:string){
    return new SignJWT({})
    .setProtectedHeader({alg:"HS256"})
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key)
}

export async function setCookie(res:NextResponse,token:string){
    res.cookies.set(COOKIE_NAME,token,{
        httpOnly:true,
        secure:process.env.NODE_ENV=="production",
        sameSite:"lax",
        path:"/",
        maxAge:MAX_AGE
    })
}

export async  function clearAuthCookies(res:NextResponse){
        res.cookies.set(COOKIE_NAME,"",{path:"/",maxAge:0})
}

// use 
export async function getUser(req:NextRequest){
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if(!token) return null;
    try {
        const {payload}= await jwtVerify(token,key);
        await connectDB();
        return User.findById(payload.sub).select("-passwordHash");
        
    } catch (error) {
        return null;
    }
}