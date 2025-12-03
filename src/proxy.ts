import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { deleteCookie, getCookie } from "./actions/auth/tokenHandlers";
import { getNewAccessToken } from "./actions/auth/auth.service";
import { getUserInfoServer } from "./actions/auth/getUserInfo";



export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow static files & public routes
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/api/") ||
        pathname.startsWith("/favicon.ico")
    ) {
        return NextResponse.next();
    }

    // Get access token
    let accessToken = await getCookie("accessToken");

    // Try refreshing token if needed
    //   if (!accessToken) {
    //     const refreshResult = await getNewAccessToken();
    //     if (refreshResult?.tokenRefreshed) {
    //       accessToken = await getCookie("accessToken");
    //     }
    //   }

    let userRole: string | null = null;
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
            if (typeof decoded !== "string") userRole = decoded.role;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            // Invalid token → logout
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect logged-in users away from login/register
    if (accessToken && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(
            new URL(userRole === "SUPER_ADMIN" ? "/0213A/admin/" : "/dashboard", request.url)
        );
    }

    // Protect private routes
    const protectedRoutes: { [key: string]: string[] } = {
        "/dashboard": ["USER"],
        "/0213A/admin/": ["ADMIN", "SUPER_ADMIN"],
        "/course/checkout": ["USER"],
        "/course/continue": ["USER"],
    };

    for (const route in protectedRoutes) {
        if (pathname.startsWith(route)) {
            if (!accessToken) {
                return NextResponse.redirect(new URL("/login", request.url));
            }

            if (!protectedRoutes[route].includes(userRole!)) {
                // Not authorized → redirect to default dashboard
                return NextResponse.redirect(
                    new URL(
                        userRole === "ADMIN" || userRole === "SUPER_ADMIN"
                            ? "/0213A/admin/"
                            : "/dashboard",
                        request.url
                    )
                );
            }
        }
    }

    // // Enforce password change
    // if (accessToken && pathname !== "/reset-password") {
    //     const userInfo = await getUserInfoServer();
    //     if (userInfo.needPasswordChange) {
    //         return NextResponse.redirect(new URL("/reset-password", request.url));
    //     }
    // }

    return NextResponse.next();
}

// Apply middleware to all routes except static, API, and public files
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
