import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/app/models/User";
connect();
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
    return NextResponse.json(
      { userEmail: user.name, userName: user.email },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
