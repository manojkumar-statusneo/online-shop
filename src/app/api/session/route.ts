
import User from "@/lib/models/user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('urbanuvati');
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  const { value } = token;
  // Always check this
  const secret = process.env.JWT_SEC || "";
  try {
   const verifiedUser= verify(value, secret);
   const existingUser =await User.find({ 
    uid: String(verifiedUser?.uid) });
    if(existingUser?.length){
        return  NextResponse.json({msg:'login successfully with data', data:  existingUser[0], status:200})
    }
    else{
        return  NextResponse.json({msg:'login successfully without data', data:  {}, status:200})
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        status:400
      }
    );
  }
}