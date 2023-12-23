import { connect } from "@/app/dbconfig/dbconfig";
import Complain from "@/app/models/Complain";
import { NextResponse } from "next/server";
connect();
export async function PUT(req) {
  try {
    const { e, id } = await req.json();
    if (!e || !id) {
      return NextResponse.json(
        { message: "invalid Input", success: false },
        { status: 200 }
      );
    }
    const adminToken = (await req.cookies.get("admintoken")?.value) || null;
    if (!adminToken) {
      return NextResponse.json(
        { message: "Only admin can update user", success: false },
        { status: 200 }
      );
    }
    if (e == "close") {
      let updatedComplain = await Complain.updateOne(
        { _id: id },
        { $set: { status: e, closeTime: new Date() } }
      );
      return NextResponse.json(
        { message: "Status Updated", success: true },
        { status: 200 }
      );
    }
     let updatedComplain = await Complain.updateOne(
      { _id: id },
      { status: e }
      );
      return NextResponse.json(
        { message: "Status Updated", success: true },
        { status: 200 }
      );
    } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
  }
}
