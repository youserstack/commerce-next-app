import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // console.log("\n[middleware]");

  const pathname = request.nextUrl.pathname;
  const isProtectedRoutes = pathname.startsWith("/my") || pathname.startsWith("/order-sheet");
  // console.log({ pathname });

  if (isProtectedRoutes) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const nextauthToken = await getToken({ req: request });
    // console.log({ nextauthToken });

    if (!(refreshToken || nextauthToken)) {
      // console.log("redirecting...");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
}

export const config = {
  matcher: ["/my/:path*", "/order-sheet/:path*"],
};
