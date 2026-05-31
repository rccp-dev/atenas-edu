"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { logout } from "@/services/auth.service";

import { browserClient } from "@/lib/supabase/browser";

export function useAuth() {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = browserClient();

    useEffect(() => {

        async function loadUser() {

            const {data: { user }} = await supabase.auth.getUser();
            setUser(user);
            setIsLoading(false);

        }

        loadUser();

    }, []);

    async function handleLogout() {

        await logout();
        setUser(null);

    }

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        logout: handleLogout,
    };

}