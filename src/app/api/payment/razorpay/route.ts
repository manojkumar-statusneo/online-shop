import dbConnect from "@/lib/db";
import Order from "@/lib/models/order";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
const getRandomId = (min = 0, max = 500000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num =  Math.floor(Math.random() * (max - min + 1)) + min;
    return `rcp${num.toString().padStart(6, "0")}`
  };
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_APP_ID!,
    key_secret: process.env.RAZORPAY_APP_SECRET,
   })
   export async function POST(request: NextRequest) {
    const { amount ,currency} = (await request.json()) as {
     amount: string;
     options:any;
     customer:any;
     currency:string
    };
    //  const  customer= {
    //     name: "Gaurav Kumar",
    //     email: "gaurav.kumar@example.com",
    //     contact: "+919000090000",
    //   }
    //  checkout: {
    //   method: {
    //     netbanking: 0,
    //     card: 1,
    //     upi: 1,
    //     wallet: 0,
    //   }
    // }
    var option = {
     amount: amount,
     currency: currency,
     receipt: getRandomId(1000,99000),
  }
    const order = await razorpay.orders.create(option);
    console.log(order);
    return NextResponse.json({id: order.id,
        currency: order.currency,
        amount: order.amount,}, { status: 200 });
   }