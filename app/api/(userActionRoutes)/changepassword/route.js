import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
export async function POST(req) {
  try {
    const { oldPassword, newPassword } = await req.json();
    const token = (await req.cookies.get("token")?.value) || null;
    if (!token) {
      return NextResponse.json(
        { message: "Login Please", success: false },
        { status: 200 }
      );
    }
    const userData = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({ _id: userData.user_id });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password Not Match", success: false },
        { status: 200 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user = await User.updateOne(
      { _id: userData.user_id },
      { password: hashedPassword }
    );
    return NextResponse.json(
      { message: "Password Changed", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
