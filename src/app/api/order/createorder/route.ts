import connect from "@/lib/db";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { order_id, products, user, totalPrice, shippingInfo, shippingCharge,address } =
    request.body;
    try {
        await connect(); 
        const order = new Order({
          order_id: order_id,
          totalPrice: totalPrice,
          user: user,
          products: products,
          address:address,
          shippingCharge: shippingCharge,
          shippingInfo: shippingInfo,
        });
        const savedOrder = await order.save();
        return NextResponse.json({msg:'order placed successfully',data:savedOrder})
    } catch (error) {
        return NextResponse.json({error:error})
    }
}