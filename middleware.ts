// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     console.log("here is the md.ts", request.url);

//     return NextResponse.redirect(new URL("/redirect", request.url));
// }

import { auth } from "./config/auth"; 

export const middleware = auth;

export const config = {
  matcher: [
    "/dashboard",

    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
