import connect from "@/lib/db";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

export const GET = async()=>{
    try {
        await connect();
        const products = await Product.find()
       return NextResponse.json({msg:'success',data:products})
    } catch (error) {
       return NextResponse.json({error:error})
    }

}