import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
connect();
export async function GET(req) {
  try {
    const adminToken = (await req.cookies.get("admintoken")?.value) || null;
    if (!adminToken) {
      return NextResponse.json(
        { message: "Only admin can access", success: false },
        { status: 200 }
      );
    }
    const alluser = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ alluser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
