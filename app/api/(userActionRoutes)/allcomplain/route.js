import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Complain from "@/app/models/Complain";
import { connect } from "@/app/dbconfig/dbconfig";
connect();
export async function GET(req) {
  try {
    const token = (await req.cookies.get("token")?.value) || null;
    if (!token)
      return NextResponse.json(
        { message: "Login Please", success: false },
        { status: 200 }
      );
    const userData = await jwt.verify(token, process.env.JWT_SECRET);
    const allComplain = await Complain.find({ userId: userData.user_id }).sort({
      updatedAt: -1,
    });
    return NextResponse.json({ allComplain }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
