import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/login";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/agenda") ||
    pathname.startsWith("/alunos") ||
    pathname.startsWith("/atividades") ||
    pathname.startsWith("/envios") ||
    pathname.startsWith("/planos") ||
    pathname.startsWith("/tarefas") ||
    pathname.startsWith("/turmas");

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/agenda/:path*",
    "/alunos/:path*",
    "/atividades/:path*",
    "/envios/:path*",
    "/planos/:path*",
    "/tarefas/:path*",
    "/turmas/:path*",
    "/login",
  ],
};