import { sendMessage } from "@/app/helper/sendMesage";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const res = await sendMessage("hih", "jkj", "kkjkj");
    return NextResponse.json({ message: "message send", res }, { status: 200 });
  } catch (error) {}
}
