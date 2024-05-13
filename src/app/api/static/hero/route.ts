
import connect from "@/lib/db";
import Hero from "@/lib/models/hero";
import { NextResponse } from "next/server";

export const GET = async()=>{
    try {
        await connect();
        const heros = await Hero.find();
       return NextResponse.json({msg:'success',data:heros})
    } catch (error) {
       return NextResponse.json({error:error})
    }
}