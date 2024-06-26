import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 console.log("url",request.nextUrl)
    const res = NextResponse.next();
    res.headers.append('Access-Control-Allow-Origin','*');
    return res;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}