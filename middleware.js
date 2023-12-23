import { NextResponse } from "next/server";
export async function middleware(request) {
  try {
    const path = request.nextUrl.pathname;
    const isPublic = path == "/login" || path == "/register";
    const isAdmin = path == "/complain" || path == "/users";
    const token = request.cookies.get("token")?.value || null;
    const adminToken = request.cookies.get("admintoken")?.value || null;
    if (path === "/") {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (!adminToken && isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    if (!token && !isPublic) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (token && isPublic) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  } catch (error) {}
}

export const config = {
  matcher: [
    "/",
    "/complain",
    "/users",
    "/dashboard",
    "/login",
    "/register",
    "/allcomplain",
    "/activecomplain",
    "/newcomplain",
    "/profile",
  ],
};
