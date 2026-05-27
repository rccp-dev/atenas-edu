/* Finalizar */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
    request: NextRequest
) {

    const hasSession = request.cookies.has("sb-access-token");
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!hasSession && !isLoginPage) {

        return NextResponse.redirect(
            new URL("/login", request.url)
        );

    }

    if (hasSession && isLoginPage) {

        return NextResponse.redirect(
            new URL("/", request.url)
        );

    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/",
        "/alunos/:path*",
        "/atividades/:path*",
    ],
};