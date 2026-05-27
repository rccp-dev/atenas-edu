import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: () => {}
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!user && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
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