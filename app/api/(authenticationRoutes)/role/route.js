import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    const token = (await req.cookies.get("token")?.value) || null;
    if (!token) {
      return NextResponse.json(
        { message: "Login Please", success: false },
        { status: 200 }
      );
    }
    const userData = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userData.user_id });
    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
