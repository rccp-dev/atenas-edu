import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function proxy(
    request: NextRequest
) {

    const hasSession =
        request.cookies.has(
            "sb-access-token"
        );

    const isLoginPage =
        request.nextUrl.pathname === "/login";

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
        "/agenda/:path*",
        "/alunos/:path*",
        "/atividades/:path*",
        "/dashboard/:path*",
        "/envios/:path*",
        "/planos/:path*",
        "/tarefas/:path*",
        "/turmas/:path*"
    ],
};