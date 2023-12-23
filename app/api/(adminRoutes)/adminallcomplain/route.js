import Complain from "@/app/models/Complain";
import { connect } from "@/app/dbconfig/dbconfig";
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
    const allComplain = await Complain.find({ status: { $ne: "close" } }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ allComplain }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
