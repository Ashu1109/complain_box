import { generateToken } from "@/app/helper/generateToken";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import { connect } from "@/app/dbconfig/dbconfig";
import { NextResponse } from "next/server";
connect();
export async function POST(req) {
  try {
    const { email, phno, password } = await req.json();
    if ((!phno && !email) || !password)
      return NextResponse.json(
        { message: "Enter All Field", success: false },
        { status: 200 }
      );
    let user = await User.findOne({ $or: [{ email }, { phno }] });
    if (!user)
      return NextResponse.json(
        { message: "User Doesn't Exist", success: false },
        { status: 200 }
      );
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 200 }
      );

    const token = await generateToken(user);
    const res = NextResponse.json(
      { message: "Login Successful", success: true, role: user.role },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
