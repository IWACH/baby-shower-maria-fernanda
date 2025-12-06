import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("hs_auth");
  const isAuthenticated = authCookie?.value === "1";

  // Proteger el home: si no está autenticado, mandar a /login
  if (pathname === "/" && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si ya está autenticado y entra a /login, mandarlo al home
  if (pathname === "/login" && isAuthenticated) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// Aplicar middleware solo a las rutas que nos interesan
export const config = {
  matcher: ["/", "/login"],
};
