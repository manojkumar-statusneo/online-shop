import { NextResponse} from 'next/server';
import { serialize } from "cookie";

export async function GET() {
     const serial= serialize('urbanuvati', '', {
          maxAge: -1,
          path: '/',
        })
      return NextResponse.json({msg:'login successfully', data:  {}, status:200},{ headers: { 'Set-Cookie': serial } },)
 
}