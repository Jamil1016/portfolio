import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAllowedEmail } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const isPrivate = request.nextUrl.pathname.startsWith("/dashboard");
  if (!isPrivate) return response;

  if (!user || !isAllowedEmail(user.email ?? "")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
