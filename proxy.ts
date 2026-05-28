import { createServerClient } from "@supabase/ssr";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {

    let response = NextResponse.next();

    const supabase =
        createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return request.cookies.getAll(); },

                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options, }) => {
                                response.cookies.set(name, value, options);
                            }
                        );
                    },
                },
            }
        );

    const {data: { session },} = await supabase.auth.getSession();

    const user = session?.user;

    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!user && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
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
        "/turmas/:path*",
        "/login",
    ],
};