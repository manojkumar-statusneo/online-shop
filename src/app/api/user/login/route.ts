import dbConnect from "@/lib/db";
import User from "@/lib/models/user";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
const MAX_AGE = 60 * 60 * 24 * 30; // days;

export const POST = async (request: any) => {
    const { mobile,uid } =
    await request.json();
   
    try {
        const secret = process.env.JWT_SEC || "";
        const token = sign(
            {
              uid,
            },
            secret,
            {
              expiresIn: MAX_AGE,
            }
          );
          const seralized = serialize('urbanuvati', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/",
          });

        await dbConnect();
       const existingUser =await User.find({ 
        uid: uid });
       console.log("existingUser",existingUser)
       if(existingUser?.length){
       
        return NextResponse.json({msg:'login successfully', data:  existingUser, status:200},{ headers: { 'Set-Cookie': seralized } },)
       }
       else{
        const newUser = new User({
          mobile:mobile,
          uid:uid
        });
        const registeredUser = await newUser.save();
        return NextResponse.json({msg:'login successfully', data:  registeredUser, status:200},{ headers: { 'Set-Cookie': seralized } },)
       }
          
    } catch (error) {
        return NextResponse.json({error:error,status:400})
    }
}