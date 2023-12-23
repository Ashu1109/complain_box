import { connect } from "@/app/dbconfig/dbconfig";
import Complain from "@/app/models/Complain";
import { NextResponse } from 'next/server'

connect(); 
export async function PUT(req) {
    try {
        const { id, assigned } = await req.json();
        const adminToken = (await req.cookies.get("admintoken")?.value) || null;
        if (!adminToken) {
          return NextResponse.json(
            { message: "Only admin can access", success: false },
            { status: 200 }
          );
        }
        const savedComplain = await Complain.updateOne(
          { _id: id },
          { assigned :assigned}
        );
        return NextResponse.json({message:"Work Assigned",success:true},{status:200})
    } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
        
    }
}