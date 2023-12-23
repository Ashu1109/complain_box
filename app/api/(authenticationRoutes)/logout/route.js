import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json(
      { message: "Logout Successfull", success: true },
      { status: 200 }
    );
    res.cookies.delete("token");
    return res;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
