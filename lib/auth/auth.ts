import { createServerClient } from "@supabase/ssr";
import { browserClient } from "../supabase/browser";
import { cookies } from "next/headers";

export async function getUser() {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll() {},
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export async function getCurrentUser() {

    const supabase = browserClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;

}