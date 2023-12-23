import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
connect();
export async function PUT(req) {
  try {
    const { id, e } = await req.json();
    const adminToken = (await req.cookies.get("admintoken")?.value) || null;
    if (!adminToken) {
      return NextResponse.json(
        { message: "Only admin can update user", success: false },
        { status: 200 }
      );
    }
    await User.updateOne({ _id: id }, { role: e });
    return NextResponse.json(
      { message: "Role Updated", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
