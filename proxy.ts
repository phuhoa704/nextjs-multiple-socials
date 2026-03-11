import { NextRequest, NextResponse } from "next/server";

/**
 * Routes that require the user to be authenticated.
 */
const PRIVATE_ROUTE_PREFIXES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/admin",
  "/overview",
  "/create-post",
  "/social-accounts",
];

const AUTH_ROUTE_PREFIXES = ["/login", "/register"];

/** The cookie key should match lib/cookieSyncStorage.ts */
const AUTH_COOKIE_NAME = "auth_persist";
const LOGIN_PATH = "/login";
const HOME_PATH = "/overview"; // Or wherever your default logged-in page is

function isAuthenticated(request: NextRequest): boolean {
  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!cookieValue) return false;

  try {
    const decoded = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decoded);

    // redux-persist might stringify values inside the object
    const isAuth =
      parsed.isAuthenticated === "true" || parsed.isAuthenticated === true;
    const hasToken =
      parsed.accessToken &&
      parsed.accessToken !== "null" &&
      parsed.accessToken !== "";

    return isAuth && !!hasToken;
  } catch (error) {
    console.error("Middleware Auth Parsing Error:", error);
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);

  // 1. If trying to access a private route and not authenticated -> redirect to login
  const isPrivate = PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isPrivate && !authenticated) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access login/register while already authenticated -> redirect to home
  const isAuthPage = AUTH_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isAuthPage && authenticated) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
};
