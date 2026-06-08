import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth/auth";

import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="h-screen bg-background">

            <div className="flex h-full">

                <Sidebar user={user} />

                <div className="flex min-w-0 flex-1 flex-col">

                    <main className="flex-1 overflow-y-auto">
                        {children}

                        <Footer />

                    </main>

                </div>
            </div>
        </div>
    );
}