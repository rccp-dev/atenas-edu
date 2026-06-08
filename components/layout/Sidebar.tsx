'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { User } from "@supabase/supabase-js";
import { BookOpen, UserCircle, LogOut, X } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { SIDEBAR_ITEMS } from "@/constants/navigation";
import { logout } from "@/services/auth.service";
import { Button } from "../ui/Button";

interface Props {
    user: User;
}

export default function Sidebar({ user }: Props) {

    const pathname = usePathname();
    const router = useRouter();

    const [openUserPanel, setOpenUserPanel] = useState(false);

    const name = user.user_metadata?.name || user.user_metadata?.full_name || "Usuário";

    const email = user.email || "";

    async function handleLogout() {
        await logout();
        router.push("/login");
        router.refresh();
    }

    return (
        <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-border bg-sidebar text-light relative">

            <div className="flex items-center gap-3 px-6 py-6">

                <Link href={ROUTES.HOME}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <BookOpen size={20} strokeWidth={2} />
                    </div>
                </Link>

                <span className="text-xl font-bold tracking-tight">
                    Atenas Edu
                </span>

            </div>

            <nav className="flex flex-1 flex-col gap-1 px-3">

                {SIDEBAR_ITEMS.map(({ label, href, icon: Icon }) => {

                    const isActive = pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={[
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-surface text-foreground"
                                    : "text-light/70 hover:bg-light/10 hover:text-light",
                            ].join(" ")}
                        >
                            <Icon size={20} strokeWidth={1.8} />
                            {label}
                        </Link>
                    );
                })}

            </nav>

            <div className="border-t border-primary px-6 py-4">

                <button
                    onClick={() => setOpenUserPanel(true)}
                    className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-light/10 transition cursor-pointer"
                >

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-light/10">
                        <UserCircle size={20} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 text-left">

                        <p className="truncate text-sm font-medium">
                            {name}
                        </p>

                        <p className="truncate text-xs text-accent">
                            {email || "Sem e-mail"}
                        </p>

                    </div>

                </button>

            </div>

            {openUserPanel && (
            <>
                <div onClick={() => setOpenUserPanel(false)} className="fixed inset-0 bg-black/50 z-999"/>

                <div className="fixed top-0 right-0 h-full w-72 bg-sidebar z-1000 flex flex-col">

                    <div className="flex items-center justify-between px-4 py-4">

                        <span className="text-LG font-semibold">
                            Conta
                        </span>

                        <button onClick={() => setOpenUserPanel(false)} className="cursor-pointer">
                            <X size={18} />
                        </button>

                    </div>

                    <hr className="border-t border-primary" />

                    <div className="p-4 space-y-4">

                        <div>
                            <p className="text-sm font-medium">{name}</p>
                            <p className="text-xs text-accent">{email}</p>
                        </div>

                        <Button variant="danger" onClick={handleLogout}>
                            <LogOut size={16} />
                            Sair
                        </Button>

                    </div>

                </div>
            </>
        )}

        </aside>
    );
}