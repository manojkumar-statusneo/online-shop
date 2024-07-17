import dbConnect from "@/lib/db";
import Address from "@/lib/models/address";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { name, pinCode, phoneNo,city,state,address,user } =
    await request.json();
    try {
        await dbConnect();
        const addressData = new Address({
          name: name,
          pinCode: pinCode,
          user: user,
          phoneNo: phoneNo,
          address:address,
          city: city,
          state: state,
        });
        const savedAddress = await addressData.save();
        return NextResponse.json({msg:'address added successfully',data:savedAddress,status:200})
    } catch (error) {
        return NextResponse.json({error:error})
    }
}