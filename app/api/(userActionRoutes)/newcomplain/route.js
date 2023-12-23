import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Complain from "@/app/models/Complain";
import User from "@/app/models/User";
import { connect } from "@/app/dbconfig/dbconfig";
connect();
export async function POST(req) {
  try {
    const { title, complain, category, uploadedImageData } = await req.json();
    if (!title || !complain || !category)
      return NextResponse.json(
        { message: "Enter All Field", success: false },
        { status: 200 }
      );
    const token = (await req.cookies.get("token")?.value) || null;
    if (!token) {
      return NextResponse.json(
        { message: "Login Please", success: false },
        { status: 200 }
      );
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userData.user_id });
    const newComplain = new Complain({
      userId: userData.user_id,
      flatno: user.flatno,
      complain,
      title,
      category,
      image: {
        public_id: uploadedImageData.public_id || null,
        url: uploadedImageData.secure_url || null,
      },
    });

    const savedComplain = await newComplain.save();
    return NextResponse.json(
      {
        message: "Complain Send To Maintenance Office",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 500 });
  }
}

