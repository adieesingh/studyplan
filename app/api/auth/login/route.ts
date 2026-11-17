import { setAuthCookie, signToken } from '@/app/lib/auth';
import { User } from '@/app/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';
const schema =z.object({email:z.string().email(),password:z.string().min(8).max(100)});

export async function POST(req:NextRequest  ){
        let body:unknown;
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({error:"Invalid json"},{status:400});
        }
        const parsed = schema.safeParse(body)
        if(!parsed.success){
            return NextResponse.json({error:"Invalid Input"},{status:400})
        };
        const user = await User.findOne({email:parsed.data.email.toLowerCase()}); 

        const ok = user &&(await bcrypt.compare(parsed.data.password,user.passwordHash));
        if(!ok || !user){
            return NextResponse.json({error:"Invalid email and password"},{status:401});
        };
        const res = NextResponse.json({
            id:user._id,email:user.email,name:user.name,timezone:user.timezone
        });
        setAuthCookie(res,await signToken(String(user._id)));
        return res;
};