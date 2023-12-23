
import { connect } from '@/app/dbconfig/dbconfig';
import Complain from '@/app/models/Complain';
import {NextResponse} from 'next/server'
connect();
export const GET = async (req) => {
    try {
        const from = await req.nextUrl.searchParams.get("from");
        const to = await req.nextUrl.searchParams.get("to");
         const adminToken =
           (await req.cookies.get("admintoken")?.value) || null;
         if (!adminToken) {
           return NextResponse.json(
             { message: "Only admin can update user", success: false },
             { status: 200 }
           );
         }
        const allComplain = await Complain.find({
          createdAt: {
            $gte: new Date(from),
            $lt: new Date(to),
          },
        });
    return NextResponse.json({ allComplain }, { status: 200 });
    } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 200 });
        
    }
}