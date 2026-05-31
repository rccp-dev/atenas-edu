import { browserClient } from "@/lib/supabase/browser";

const supabase = browserClient();

export async function login(email: string, password: string) {
    
    const { error } =
        await supabase.auth.signInWithPassword({ email, password,});

    if (error) {
        throw error;
    }

}

export async function logout() {

    const { error } =
        await supabase.auth.signOut();

    if (error) {
        throw error;
    }

}