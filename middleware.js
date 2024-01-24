import { NextResponse } from "next/server"

export function middleware(request) {
  const path=request.nextUrl.pathname

  const isPublicPath=path==='/signin' || path ==='/signup'

  const token =request.cookies.get('token')?.value || ''

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/trading',request.nextUrl));
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/signin',request.nextUrl))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/',
    '/trading',
    '/signin',
    '/signup',
    '/dashboard',
    '/transferFunds'
  ],
}
