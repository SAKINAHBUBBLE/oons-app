import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest, user: string, password: string) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  const decoded = Buffer.from(header.slice(6), "base64").toString();
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  return decoded.slice(0, separatorIndex) === user && decoded.slice(separatorIndex + 1) === password;
}

export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) {
    // Pas de mot de passe configuré : le site reste accessible (utile en local).
    return NextResponse.next();
  }

  const user = process.env.SITE_PASSWORD_USER || "oons";

  if (isAuthorized(request, user, password)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Oons"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
