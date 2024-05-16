import dbConnect from "@/lib/db";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { userId } =
    await request.json();
    try {
        await dbConnect();
        const orders = await Order.find({ user: userId });
        if(orders?.length){
            return NextResponse.json({msg:'order fetched', data: orders, status:200})
        }
        else{
            return NextResponse.json({ data: orders, msg: "no orders",status:200 })
        }
        
    } catch (error) {
        return NextResponse.json({error:error})
    }
}