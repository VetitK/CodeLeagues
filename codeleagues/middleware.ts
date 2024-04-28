import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { data: { user } } = await updateSession(request);
  const res = NextResponse.next()

  if (user) {
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return res
  }

  if (!user) {
    if (request.nextUrl.pathname === '/register') {
      return res
    }

    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return res
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
