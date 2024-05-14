import connect from "@/lib/db";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

export const GET = async(request: Request, context: { params: any })=>{
    try {
        await connect();
        const catid = context.params.catid;
        console.log(catid)
        const catData = await Product.find({ category: catid });
       return  NextResponse.json({msg:'success',data:catData})
    } catch (error) {
       return NextResponse.json({error:error})
    }

} 