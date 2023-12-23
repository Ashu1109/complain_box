import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
connect();
export async function POST(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "invalid Input", success: false },
        { status: 200 }
      );
    }
    const adminToken = (await req.cookies.get("admintoken")?.value) || null;
    if (!adminToken) {
      return NextResponse.json(
        { message: "Only admin can delete user", success: false },
        { status: 200 }
      );
    }
    const user = await User.deleteOne({ _id: id });
    return NextResponse.json(
      { message: "User Deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
