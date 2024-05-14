
import dbConnect from "@/lib/db";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";


export const GET = async()=>{
    try {
        await dbConnect();
        const cats = await Category.find();
       return NextResponse.json({msg:'success',data:cats})
    } catch (error) {
       return NextResponse.json({error:error})
    }
}