import { connect } from "@/app/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Complain from "@/app/models/Complain";
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
    const activeComplain = await Complain.find({
      userId: userData.user_id,
      status: { $ne: "close" },
    }).sort({
      updatedAt: -1,
    });
    return NextResponse.json({ activeComplain }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
