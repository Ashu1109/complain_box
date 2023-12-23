import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connect();
export async function POST(req) {
  try {
    const { name, flatno, phno, email, password } = await req.json();
    if (!name || !flatno || !phno || !email || !password)
      return NextResponse.json(
        { message: "Enter All field", success: false },
        { status: 200 }
      );
    const user = await User.findOne({ $or: [{ email }, { phno }] });
    if (user)
      return NextResponse.json(
        { message: "User Already exist", success: false },
        { status: 200 }
      );
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      flatno,
      phno,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const tokenContent = {
      user_id: savedUser._id,
      email,
      name,
    };
    const token = await jwt.sign(tokenContent, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    const res = NextResponse.json(
      { message: "Registration Successful", success: true },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
