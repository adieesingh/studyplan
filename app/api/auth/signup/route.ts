import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { setAuthCookie, signToken } from "@/app/lib/auth";
const isValidTimezone = (tz: string) => {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch (error) {
    return false;
  }
};

const schema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(8).max(100),
  name: z.string().max(50).optional(),
  timezone: z.string().refine(isValidTimezone, "Invalid timezone").optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error?.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { email, password, name, timezone } = parsed.data;
  await connectDB();
  if (await User.findOne({ email: email.toLowerCase() })) {
    return NextResponse.json({ error: "Email already exit" }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      passwordHash,
      name,
      ...(timezone && { timezone }),
    });
    const res = NextResponse.json(
      {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          timezone: user.timezone,
        },
      },
      { status: 201 },
    );
    setAuthCookie(res, await signToken(String(user._id)));
    return res;
  } catch (error) {
    return NextResponse.json({error:"Server error"},{status:500})
   }
}
