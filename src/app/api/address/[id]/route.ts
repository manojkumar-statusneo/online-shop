import dbConnect from "@/lib/db";
import Address from "@/lib/models/address";
import { NextResponse } from "next/server";

export const GET = async(request: Request, context: { params: any })=>{
    console.log("context",context)
    try {
        await dbConnect();
        const userId = context.params.id;
        const address = await Address.find({ user:userId });
       return  NextResponse.json({msg:'success',data:address})
    } catch (error) {
       return NextResponse.json({error:error})
    }

} 